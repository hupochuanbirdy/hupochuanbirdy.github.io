---
title: "How to read Data from USB CallerID deivce in Flutter"
date: 2025-08-28T16:21:25+01:00
lastmod: 2025-08-28T16:21:25+01:00
subTitle: ""
description: ""
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["Tutorial" ,"flutter", "usb deivces"]
categories: ["flutter"]
cover:
    position: <left,right>
    image: "https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2025-08-28/cover.png"
    alt: "<alt text>"
    caption: "<text>"
---

## Intro


In the restaurant ordering scenario, phone orders are still quite common (though to be honest, I personally think this approach feels pretty traditional, even a bit outdated). When a restaurant takes a call, the staff usually has to ask for the phone number, address, and name, then manually type everything into the system. This process is not only slow but also prone to mistakes.

If we could recognize the phone number right when the call comes in, and directly match it with the customer’s past information (like delivery address or frequently ordered dishes), we could save a lot of repetitive work. That’s exactly what I’m trying to do here: integrate a CallerID device into a Flutter app. When a customer calls, the system instantly recognizes the number, and if the customer already exists in the database, their info pops up automatically—no manual input needed.

CallerID is basically a small hardware device that connects to the telephone line. When a call comes in, it captures the number and sends the data to the computer via **USB** or **serial port**. When buying such a device, you need to check what platforms it supports. For example, the Artech110 only works on Windows, so I ended up using the **CID EASY** device for my development.

Here’s the catch: Flutter is essentially a cross-platform UI framework, and it can’t directly talk to low-level hardware like this. A CallerID device continuously pushes out USB/serial data streams, which Dart simply can’t access. I couldn’t find any ready-made Flutter plugin for this either. So, the only option was to implement it myself: read the raw USB data, parse it into a plain phone number, and then pass it over to Flutter using a **Platform Channel** or **Event Channel**. Once Flutter receives the number, it can check the database, and if it’s an existing customer, show their info right away.


## The Flow: How to realise

To make this work in practice, the overall flow looks like this:

1. Capture the raw data
On the native side (Windows/Linux/macOS/Android), read the raw stream from the CallerID device via USB or serial port.

2. Parse the number
The raw stream usually contains control characters and formatting codes. Strip those out and extract a clean phone number string.

3. Bridge to Flutter
Use Platform Channel or Event Channel to pass the parsed phone number from the native layer to the Dart side.

4. Your Own logic & Display customer info
Once Flutter receives the number, query the local or remote database to check if this number belongs to an existing customer.
If the customer exists, show their saved information (address, past orders, etc.) right away, skipping manual entry. If not, proceed with normal input.


## Implementation

1. Scan devices by USB connection
2. Connet the device
3. Setup the thread for listening data from incoming call
4. Catch the Data from USB, pass it to your own flutter app


### Plugin 

Here is the project Structure.

<div class="polaroid"  style="width:30%" >
   <a data-fancybox="gallery" data-src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2025-08-28/1.png">
        <img src="https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2025-08-28/1.png" />
    </a>
</div>


This is the main entry --- flutter_callerid.dart, It usually exports the public-facing API that app developers will us

flutter_callerid_method_channel.dart --- provides the default implementation (talks to native).

flutter_callerid_platform_interface.dart  -- defines the abstract interface.

###  Set up an EventChannel to receive streamed data

In this step, need to use a **native USB library** on each platform to **scan and open the CallerID device**, then start a background listener that reads the raw bytes continuously. The native layer pushes the parsed phone number upstream via an **EventChannel**, so Flutter can subscribe to the **stream** and react in real time.

**What happens under the hood (high level):**

* Use the platform’s native USB package to **enumerate devices** and **select the CallerID**.
* **Open** the device and **start a background thread** to read the incoming data.
* **Parse** the raw stream (strip control codes → get a clean number).
* **Emit** each parsed number through the EventChannel → Flutter listens and updates the UI / queries the DB.

```dart
<!-- devices_service.dart -->
  Future<void> _getUSBDevices() async {
    try {
      final devices = await FlutterCalleridPlatform.instance.startUsbScan();
      List<DeviceModel> usbPrinters = [];
      for (var map in devices) {
        final device = DeviceModel(
          vendorId: map['vendorId'].toString(),
          productId: map['productId'].toString(),
          name: map['name'],
          connectionType: ConnectionType.USB,
          address: map['vendorId'].toString(),
          ....
        );
        usbPrinters.add(device);
      }

      _devices.addAll(usbPrinters);

      // Start listening to USB events
      _usbSubscription = _deviceEventChannel.receiveBroadcastStream().listen((
        event,
      ) {
        final map = Map<String, dynamic>.from(event);
        _updateOrAddPrinter(
          DeviceModel(
            vendorId: map['vendorId'].toString(),
            productId: map['productId'].toString(),
            name: map['name'],
            connectionType: ConnectionType.USB,
            address: map['vendorId'].toString(),
           ...
          ),
        );
      });
      // remove Duplicate deivces
      _sortDevices();
    } catch (e) {
      log("$e [USB Connection]");
    }
  }

```

`FlutterCalleridPlatform.instance.startUsbScan(); ` method need to define in `flutter_callerid_platform_interface.dart` `flutter_callerid_method_channel.dart` and `flutter_callerid.dart`

```dart


  // flutter_callerid_platform_interface.dart

  Future<dynamic> startUsbScan() {
    throw UnimplementedError('startUsbScan() has not been implemented.');
  }

  // flutter_callerid_method_channel.dart
  @override 
  Future<dynamic> startUsbScan() async {
    return await methodChannel.invokeMethod('getAvailableDevices');
  }


  // flutter_callerid.dart, you can ignore cloudPrinterNum and  androidUsesFineLocation, this is for my printer scanning

  Future<void> getDevices({
    List<ConnectionType> connectionTypes = const [ConnectionType.USB],
    bool androidUsesFineLocation = false,
    int cloudPrinterNum = 1,
  }) async {
    DevicesService().getDevices(
      connectionTypes: connectionTypes,
      androidUsesFineLocation: androidUsesFineLocation,
      cloudPrinterNum: cloudPrinterNum,
    );
  }


```

In the Android side, define method in onMethodCall to get usb devices

```java
    @Override
    public void onMethodCall(@NonNull MethodCall call, @NonNull MethodChannel.Result result) {
        switch (call.method) {
            case "getAvailableDevices":
                result.success(flutterCallerIdMethod.getUsbDevicesList());
            break;
          ....
        }
    }
```


 ###  Connet the device


```dart


  // flutter_callerid_platform_interface.dart
  Future<bool> connectToHidDevice(String vid, String pid) {
    throw UnimplementedError('connectToHidDevice() has not been implemented.');
  }

  // flutter_callerid_method_channel.dart
  @override
  Future<bool> connectToHidDevice(String vid, String pid) async {
    return await methodChannel.invokeMethod('connectToHidDevice', {'vendorId': vid, 'productId': pid});
  }

  // flutter_callerid.dart,  callerID is HID device
  /// Connect to a specific HID device by device ID
  Future<bool> connectToHidDevice(DeviceModel device) async {
    return await DevicesService().connect(device);
  }

```

In the Android side, define method in onMethodCall to connect HID device

```java
    @Override
    public void onMethodCall(@NonNull MethodCall call, @NonNull MethodChannel.Result result) {
        switch (call.method) {
            case "connectToHidDevice": {
                String vendorId = call.argument("vendorId");
                String productId = call.argument("productId");
                flutterCallerIdMethod.connect(vendorId, productId);
                result.success(false);
                break;
            }
          ....
        }
    }





```

FlutterCallerIdMethod.java Implementation here. Usb device will pop the syetem connetion dialog when connect in the first time , then it will detect automatically

``` java

    // Connect using VendorId and ProductId
    public void connect(String vendorId, String productId) {
        connectionVendorId = vendorId;
        connectionProductId = productId;
        UsbManager m = (UsbManager) context.getSystemService(Context.USB_SERVICE);
        UsbDevice device = findDevice(m, vendorId, productId);

        if (device == null) {
            AppLogger.d(TAG, "when connect but Device not found.");
            return;
        }

        if (!m.hasPermission(device)) {
            AppLogger.d(TAG, "Requesting permission for device...");
            PendingIntent permissionIntent = PendingIntent.getBroadcast(context, 0, new Intent(ACTION_USB_PERMISSION), PendingIntent.FLAG_IMMUTABLE);
            m.requestPermission(device, permissionIntent);
        } else {
            AppLogger.d(TAG, "Permission already granted. Proceeding.");
            sendDevice(device, false); // Proceed directly if permission exists
        }
    }

```

### Setup the thread for listening data from incoming call

Connect the USB device, then launch a background listener thread to read incoming data.


```java

Class xx{
    UsbDevice listeningDevice = null;

    // Method to start listening on the USB device for CallerID data

    public void startListening(String vendorId, String productId) {
        AppLogger.d(TAG, "Attempting to connect to device...");

        UsbManager m = (UsbManager) context.getSystemService(Context.USB_SERVICE);
        UsbDevice currentDevice = null;
        for (UsbDevice device : m.getDeviceList().values()) {
            if (String.valueOf(device.getVendorId()).equals(vendorId) && String.valueOf(device.getProductId()).equals(productId)) {
                currentDevice = device;
                break;
            }
        }

        if (currentDevice == null) {
            AppLogger.e(TAG, "No connected device.");
            return;
        }
        if (!m.hasPermission(currentDevice)) {
            AppLogger.e(TAG, "No permission for device. Please request it via broadcast.");
            return;
        }
        listeningDevice = currentDevice;
        UsbInterface intf = currentDevice.getInterface(0);
        String deviceType = getDeviceType(intf);
        AppLogger.d("USB", deviceType);

        connection = m.openDevice(currentDevice);
        if (connection == null) {
            AppLogger.e(TAG, "Failed to open or claim interface.");
            return;
        }

        mIntf = currentDevice.getInterface(0);
        if (!connection.claimInterface(mIntf, true)) {
            AppLogger.e(TAG, "Failed to claim interface.");
            return;
        }

        AppLogger.d(TAG, "  Interface Class: " + mIntf.getInterfaceClass());

        // Dynamically pick endpoints by direction
        for (int i = 0; i < mIntf.getEndpointCount(); i++) {
            UsbEndpoint ep = mIntf.getEndpoint(i);
            if (ep.getDirection() == UsbConstants.USB_DIR_IN) rEndpoint = ep;
            else if (ep.getDirection() == UsbConstants.USB_DIR_OUT) wEndpoint = ep;
            AppLogger.d(TAG, "Endpoint #" + i + " type=" + ep.getType() + ", direction=" + (ep.getDirection() == UsbConstants.USB_DIR_IN ? "IN" : "OUT") + ", address=" + ep.getAddress() + ", maxPacketSize=" + ep.getMaxPacketSize());
        }


        if (rEndpoint == null) {
            AppLogger.e(TAG, "No readable endpoint found.");
            return;
        }

        AppLogger.d(TAG, "Claimed interface and endpoints. Starting read loop...");
        sendData("AT+VCID=1\\r");
        readThread = new Thread(this::readLoop);
        readThread.start();
        reading = true;
    }



  // Thread
  private void readLoop() {
        byte[] buffer = new byte[64];

        while (reading) {
            int len = connection.bulkTransfer(rEndpoint, buffer, buffer.length, TIMEOUT);
            if (len > 0) {
                analyzePackage(buffer);
            } else if (len == -1) {
                AppLogger.w(TAG, "No data or timeout.");
            }
            Sleep(SLEEP);
        }
    }


    // Parse data

    private String sDateTime = "";
    private String sCaller = "";
    private String sCallee = "";
    private String sOther = "";
    private char sPort = 0;

    private void analyzePackage(byte[] bytes) {
        try {
            final String strPackage = composeString(bytes);

            if (strPackage.contains("ENQ") ||strPackage.contains("ETB")){
                sendData(ACK);
            }
            else {
                sendData(DCK);
                if (testCliPackage(bytes)) {
                    //Pass data to flutter
                    Map<String, Object> callInfo = new HashMap<>();
                    callInfo.put("caller", sCaller);
                    callInfo.put("callee", sCallee);
                    callInfo.put("datetime", sDateTime);
                    callInfo.put("port", String.valueOf(sPort));
                    if (callerIdEventSink != null)
                        mainHandler.post(() -> callerIdEventSink.success(callInfo));


                }
            }
        } catch (Exception e) {
        }
    }

    private boolean testCliPackage(byte[] Package) {
        boolean res = false;
        try {
            byte[] portNames = {'A', 'B', 'C', 'D', 'S'};
            int[] pckTypes = {0x04, 0x80};

            byte pPort = Package[0];
            int pType = Math.abs((int) Package[1]);
            int pLen = Math.abs((int) Package[2]);

            if ((pLen > 0) && (pLen < 65) && Arrays.binarySearch(portNames, pPort) >= 0 && Arrays.binarySearch(pckTypes, pType) >= 0) {
                if (pType == 0x80) {
                    res = parseMDMF(Package);
                }
                if (pType == 0x04) {
                    res = parseSDMF(Package);
                }
            }
        } catch (Exception e) {
        }
        return res;
    }

    private boolean parseSDMF(byte[] Package) {
        int packlength = 0;
        char theChar = 0;

        try {
            packlength = Package[2] + 4;
            sPort = (char) Package[0];
            sCaller = "";
            sCallee = "";
            sDateTime = "";
            sOther = "";

            for (int i = 3; i <= packlength - 2; i++) {
                if (i < Package.length) {
                    theChar = (char) Package[i];
                    if (i < 11) {
                        sDateTime = sDateTime + (char) Package[i];
                    } else {
                        sCaller = sCaller + theChar;
                    }
                }
            }
        } catch (Exception e) {
        }

        return (!enableCheckDigitControl || testCheckDigit(Package));
    }

    private boolean parseMDMF(byte[] Package) {
        int packlength = 0;
        int datalength = 0;
        char theChar = 0;
        int i;

        try {
            packlength = Package[2] + 4;
            sPort = (char) Package[0];
            sCaller = "";
            sCallee = "";
            sDateTime = "";
            sOther = "";

            if (packlength > Package.length) {
                packlength = Package.length;
            }

            if (packlength > 0) {
                i = 3;
                datalength = 0;
                while (i < Package.length) {
                    if (Package[i] == 1) // Date Field
                    {
                        i++;
                        if (i < packlength - 1) {
                            datalength = Package[i];
                            if (datalength != 8) datalength = 8;
                            if (datalength == 8) {
                                while ((datalength > 0) && (datalength < packlength)) {
                                    i++;
                                    theChar = (char) Package[i];
                                    sDateTime = sDateTime + theChar;
                                    datalength--;
                                }
                            }
                        }
                    } else if (Package[i] == 2)  // Number Field
                    {
                        i++;
                        if (i < packlength - 1) {
                            datalength = Package[i];
                            if (datalength > (packlength - i - 1))
                                datalength = (packlength - i - 1);
                            while ((datalength > 0) && (datalength < packlength)) {
                                i++;
                                theChar = (char) Package[i];
                                sCaller = sCaller + theChar;
                                datalength--;
                            }
                        }
                    } else if (Package[i] == 34)  //Callee field
                    {
                        // Other Fields
                        i++;
                        if (i < packlength - 1) {
                            datalength = Package[i];
                            while ((datalength > 0) && (datalength < packlength)) {
                                i++;
                                theChar = (char) Package[i];
                                sCallee = sCallee + theChar;
                                datalength--;
                            }
                        }
                    } else {
                        // Other Fields
                        i++;
                        if (i < packlength - 1) {
                            datalength = Package[i];
                            while ((datalength > 0) && (datalength < packlength)) {
                                i++;
                                theChar = (char) Package[i];
                                sOther = sOther + theChar;
                                datalength--;
                            }
                        }
                    }
                    i++;
                }
            }
        } catch (Exception e) {
        }

        return (!enableCheckDigitControl || testCheckDigit(Package));
    }

    private static final boolean enableCheckDigitControl = true;

    private static boolean testCheckDigit(byte[] inputReport) {
        int pLen = 0;
        int cDigit = 123;
        int pDigit = 0;

        try {
            pLen = inputReport[2] + 3;
            cDigit = inputReport[pLen] & 255;
            for (int i = 1; i < pLen; i++)
                pDigit = (pDigit + Math.abs((int) inputReport[i] & 255)) & 255;
            pDigit = Math.abs((int) (0x100 - pDigit)) & 255;
        } catch (Exception e) {
        }

        return pDigit == cDigit;
    }

    private String composeString(byte[] bytes) {
        String strPackage = "";

        try {
            StringBuilder builder = new StringBuilder();
            for (byte b : bytes) {
                if (b > 0) {
                    char c = (char) b;
                    builder.append(c);
                }
            }
            strPackage = builder.toString();
        } catch (Exception e) {
        }

        return strPackage;
    }


    private void Sleep(int milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

```



### Logic in Your flutter app

Connect the CallerID device → start the listener → receive the stream data → process it according to your business logic.

```dart
   // Import package
 
import 'package:flutter_callerid/model/usb_device_model.dart' as callerid;

class YourClassName {

  final _flutterCalleridPlugin = FlutterCallerid();
  StreamSubscription<Map<String, dynamic>>? _callerIdStreamSubscription;
  StreamSubscription<List<callerid.DeviceModel>>? _devicesStreamSubscription;

  callerid.DeviceModel? _connectedCallerIdDevice;
  List<callerid.ConnectionType> getScanConnectionType() {
    return [
      <!-- callerid.ConnectionType.BLE, -->
     callerid.ConnectionType.USB,
      <!-- callerid.ConnectionType.NETWORK, -->
    ];
  }
 // Method Strat Scan devices
  Future<void> startScan() async {
    _devices = [];
    await _devicesStreamSubscription?.cancel();
    await _flutterCalleridPlugin.getDevices(
        connectionTypes: getScanConnectionType());
    _devicesStreamSubscription = _flutterCalleridPlugin.devicesStream.listen((List<callerid.DeviceModel> event) {
      // Only keep devices with a non-empty name containing 'caller' 
      _devices = event
          .where((element) =>
              (element.name?.isNotEmpty ?? false) &&
              ((element.name?.toLowerCase().contains('caller') ?? false)))
          .toList();
      _devices = _devices.where((element) => element.isRemove == null || element.isRemove == false).toList();
    });
  }


  Future<void> onConnectedCallerId(callerid.DeviceModel findDevice) async {
      bool res = await _flutterCalleridPlugin.connectToHidDevice(findDevice);
      if (res) {
        _connectedCallerIdDevice = findDevice;
        await startListening();
      } 
  }
  Future<void> startListening() async {
    _callerIdStreamSubscription?.cancel();
    
    // stream
    _callerIdStreamSubscription = _flutterCalleridPlugin.callerIdStream.listen((callInfo) async {
      // Recive data from the plugin

      // Your own logic to parse Map to Model , and search from  DB
      CallerIdModel callerIdModel = CallerIdModel.fromJson(callInfo);
      if (callerIdModel.caller == null || (callerIdModel.caller ?? "").isEmpty) {
        return;
      }
      YOUR_OWN_HANDLE_MTHOD(callerIdModel);

     
    });
    await _flutterCalleridPlugin.startListening(_connectedCallerIdDevice!);
  }


}
  
```

My logic is straightforward: as soon as the number comes in, I look it up in the database and show the result inside a draggable overlay card.

## Repo Source Code

https://github.com/Amber916Young/flutter_callerID


This repo actually combines **CallerID** and **printer support** (USB/WiFi/BLE), which is why it covers quite a lot of things.

But the core idea is really simple:

* Connect the device over **USB**
* Start a thread to **listen for incoming data** from the landline
* **Parse** the raw stream
* **Return** the clean phone number back to Flutter

That’s the essential flow. Everything else is just implementation details that vary depending on your hardware and platform.
