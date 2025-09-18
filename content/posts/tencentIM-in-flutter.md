---
title: "TencentIM(Instant messaging) C2C chat in Flutter"
date: 2024-07-21T13:17:31+01:00
lastmod: 2024-07-21T13:17:31+01:00
subTitle: ""
description: "I have been fully focused on IM (instant messaging) in Flutter. It's quite a huge functionality. This article will include initialization, conversation management, message management (text, image, voice, video), and loading progress display."
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["flutter", "tencent" ,"IM(Instant messaging)"]
categories: ["flutter"]
cover:
    position: <left,right>
    image: "https://i.imgur.com/tiM7txS.png"
    alt: "<alt text>"
    caption: "<text>"
---

>Recently, I have been fully focused on IM (instant messaging) in Flutter. It's quite a huge functionality. This article will include initialization, conversation management, message management (text, image, voice, video), and loading progress display. In my project, I use my own UI design, which I find more flexible and prettier (in my perspective 😉).


Here is the message module folder. A little bit ambitious, I have to say. Don't worry, let's dig into this interesting module in Flutter.

<blockquote class="imgur-embed-pub" lang="en" data-id="1RmKkah"><a href="https://imgur.com/1RmKkah">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

A quick bit of background on IM: In the official document, IM stands for instant messaging, which you probably use every single day in products like WhatsApp, Instagram, Slack, WeChat, and so on. Instant Messaging (IM) provides applications with the ability to support single chat, group chat, pop-ups, and other chat modes. It supports text, pictures, voice, short video, and other types of messages for social communication.





## Preparation(Need to register tencent account)

Here is the offical document you can refer to https://cloud.tencent.com/document/product/269/75286

| Platform | Version |
|--|--|
| Flutter |  Above 2.2.0 |
| Android |  Android Studio 3.5 and above, App requires Android 4.1 and above devices. |
| iOS |  Xcode 11.0 and above, for real machine debugging please make sure your project has a valid developer signature. |

## IM Initialization

>The reference link for this section is ❤️ https://cloud.tencent.com/document/product/269/75293

Before you can use the features of the IM SDK, you must initialize it.
In most scenarios, you will only need to initialize the IM SDK once during the application lifecycle.
Here is the link to register account https://www.tencentcloud.com/?lang=en&pg=

The following steps are required to initialize the SDK:
1. Prepare the SDKAppID.
2. Set the LogLevelEnum. 
3. Set the SDK event listener. 
4. Call initSDK to initialize the SDK.

You must have the correct SDKAppID for initialization.
SDKAppID is a unique identifier used by Tencent Cloud IM service to distinguish customer accounts. We recommend that each individual App apply for a new SDKAppID. messages between different SDKAppIDs are naturally segregated and cannot be interchanged.

<blockquote class="imgur-embed-pub" lang="en" data-id="Ukbd6Jx"><a href="https://imgur.com/Ukbd6Jx">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

### Setting up SDK event listeners

{{< highlight dart "linenos=table" >}}
class IMHelper {
  static V2TIMManager v2TIMManager = V2TIMManager();
  static V2TimAdvancedMsgListener messageListener = V2TimAdvancedMsgListener();
  static V2TimGroupListener groupListener = V2TimGroupListener();
  static V2TimConversationListener conversationListener = V2TimConversationListener();
  static V2TimFriendshipListener friendshipListener = V2TimFriendshipListener();
  static V2TIMFriendshipManager friendshipManager = V2TIMFriendshipManager();
  static V2TIMConversationManager conversationManager = V2TIMConversationManager();

  static Future<void> initSDK() async {
    V2TimSDKListener sdkListener = V2TimSDKListener(
      onConnectFailed: (int code, String error) {
        // 连接失败的回调函数
        // code 错误码
        // error 错误信息
        print("code $code  error $error");
      },
      onConnectSuccess: () {
        // SDK 已经成功连接到腾讯云服务器
      },
      onConnecting: () {
        // SDK 正在连接到腾讯云服务器
      },
      onKickedOffline: () {
        // 当前用户被踢下线，此时可以 UI 提示用户，并再次调用 V2TIMManager 的 login() 函数重新登录。
      },
      onSelfInfoUpdated: (V2TimUserFullInfo info) {
        // 登录用户的资料发生了更新
        // info登录用户的资料
        print("info登录用户资料");
      },
      onUserSigExpired: () {
        // 在线时票据过期：此时您需要生成新的 userSig 并再次调用 V2TIMManager 的 login() 函数重新登录。
        // login(IMConfig.userid);
      },
      onUserStatusChanged: (List<V2TimUserStatus> userStatusList) {
        //用户状态变更通知
        //userStatusList 用户状态变化的用户列表
        //收到通知的情况：订阅过的用户发生了状态变更（包括在线状态和自定义状态），会触发该回调
        //在 IM 控制台打开了好友状态通知开关，即使未主动订阅，当好友状态发生变更时，也会触发该回调
        //同一个账号多设备登录，当其中一台设备修改了自定义状态，所有设备都会收到该回调
      },
    );

    V2TimValueCallback<bool> initSDKRes = await v2TIMManager.initSDK(
      sdkAppID: int.parse(IMConfig.sdkappid),
      loglevel: LogLevelEnum.V2TIM_LOG_ALL, // Log
      listener: sdkListener,
    );

    if (initSDKRes.code == 0) {
      //初始化成功
      // login(IMConfig.userid);
    }
  }

  ......
}  

{{< /highlight >}}

### login/ logout
The first time you log in to an IM account, you do not need to register the account first. IM automatically completes the registration of the account after a successful login. You can call the login (click to view details) interface to log in.

To incorporate the business logic of my project, I've handled the registration or login when the user logs into my app.


{{< highlight dart "linenos=table" >}}
  static Future<void> login(MemberInfoModel? memberInfoModel) async {
    String key = IMConfig.key;
    String userId = memberInfoModel!.id.toString();
    UserSigGenerateUtils generateTestUserSig = UserSigGenerateUtils(sdkappid: int.parse(IMConfig.sdkappid), key: key);
    String userSig = generateTestUserSig.genSig(identifier: userId, expire: 99999);

    V2TimCallback res = await v2TIMManager.login(
      userID: userId,
      userSig: userSig,
    );

    if (res.code == 0) {
      // 登录成功逻辑
      IMHelper.getLoginUser(memberInfoModel);
      print("登录成功逻辑 ${res.desc}");
    } else {
      print("登录失败 ${res.code}");
    }
  }


{{< /highlight >}}

The `getLoginUser` method is used to set up user information, such as avatar and username.

{{< highlight dart "linenos=table" >}}


  static Future<void> getLoginUser(MemberInfoModel memberInfoModel) async {
    V2TimValueCallback<String> getLoginUserRes = await v2TIMManager.getLoginUser();
    if (getLoginUserRes.code == 0) {
      //获取成功
      V2TimUserFullInfo defaultUserInfo = V2TimUserFullInfo(
        nickName: memberInfoModel.userName,
        allowType: 0,
        role: 0,
        faceUrl: memberInfoModel.userPhoto,
        gender: 2,
        selfSignature: memberInfoModel.introduction,
      );
      v2TIMManager.setSelfInfo(userFullInfo: defaultUserInfo);
    }
  }
{{< /highlight >}}







## Conversation Management 
>This is the parameter description of Conversation class https://comm.qq.com/im/doc/flutter/zh/SDKAPI/Class/Message/V2TimConversation.html

When a user creates a single or group chat, the corresponding session is created.
In Tencent Cloud IM SDK, the session class is `TencentImSDKPlugin.v2TIMManager.getConversationManager()`. You can use the APIs in the conversation manager class to realize the functions of conversation list display/update, conversation unread count update, top conversation, conversation draft, conversation do not disturb and so on.

In my project, I need to get all the conversations and display them, including the username, user avatar, number of unread messages, whether it is pinned or not, and whether it is in do-not-disturb mode.

<blockquote class="imgur-embed-pub" lang="en" data-id="0qCe19T"><a href="https://imgur.com/0qCe19T">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

### Get all Conversations

You can get the conversations by using pagination. Because I need to use conversations on other screens, I define this value in the message provider.

Here is the code in Message provider

{{< highlight dart "linenos=table" >}}
  List<V2TimConversation?>? _allConversations = [];
  List<V2TimConversation?>? get allConversations => _allConversations;

  Future<void> getAllConversations() async {
    _allConversations = [];
    _allConversations = await IMHelper.getConversationList();
    notifyListeners();
  }
{{< /highlight >}}

In the IMHelper class, there is a recursive function to get all conversations at once.

{{< highlight dart "linenos=table" >}}
  static Future<V2TimValueCallback<V2TimConversationResult>> getConversations(String nextSeq) async {
    return await v2TIMManager.getConversationManager().getConversationList(
        count: 100, // Number of conversations to fetch per request
        nextSeq: nextSeq // Cursor for pagination
        );
  }

  static Future<List<V2TimConversation?>> getConversationList(
      {String nextSeq = "0", List<V2TimConversation?>? accumulatedList}) async {
    // Initialize the accumulated list if it's null
    accumulatedList ??= [];

    // Fetch conversations
    V2TimValueCallback<V2TimConversationResult> getConversationListRes = await getConversations(nextSeq);

    if (getConversationListRes.code == 0) {
      // If fetching is successful, accumulate the conversation list
      accumulatedList.addAll(getConversationListRes.data?.conversationList ?? []);

      // Check if the fetching is finished
      bool? isFinished = getConversationListRes.data?.isFinished;
      String? nextSeq = getConversationListRes.data?.nextSeq;

      // If not finished, recursively fetch the next set of conversations
      if (isFinished != true) {
        return getConversationList(nextSeq: nextSeq ?? "0", accumulatedList: accumulatedList);
      }
    }

    // Return the accumulated list of conversations
    return accumulatedList;
  }

{{< /highlight >}}


### Pin Conversation

You can add the callback to handle the next logic action after success.

{{< highlight dart "linenos=table" >}}
  static Future<bool> pinConversation(bool isPinned, String conversationID) async {
    V2TimCallback callback =
        await conversationManager.pinConversation(conversationID: conversationID, isPinned: isPinned);
    if (callback.code == 0) {
      ToastUtils.showSuccessToast("success");
      return true;
    } else {
      ToastUtils.showErrorToast("fail");
      return false;
    }
  }
{{< /highlight >}}

### Delete Conversation

{{< highlight dart "linenos=table" >}}

  static Future<void> deleteConversation(String conversationID) async {
    V2TimCallback deleteConversationRes = await conversationManager.deleteConversation(conversationID: conversationID);
    if (deleteConversationRes.code == 0) {
      ToastUtils.showSuccessToast("delete success");
    }
  }
{{< /highlight >}}



## Message Management 
>This is the description of Message https://cloud.tencent.com/document/product/269/75674

It provides text messages, image messages, voice messages, video messages, emoji messages, and custom messages.

In my project requirements, I need to display these messages using different UIs based on the message type. Another tricky aspect is displaying the sending time. If some messages are sent within one minute of each other, only one timestamp should be displayed. This is similar to how WeChat handles message timestamps.


<blockquote class="imgur-embed-pub" lang="en" data-id="WFT4sW5"><a href="https://imgur.com/WFT4sW5">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

### Send a text Message 

It's very easy.

{{< highlight dart "linenos=table" >}}

  static Future<void> sendTextMessage(String message, Function(V2TimMessage) onMessageSent,
      {String? receiverId, String? groupId}) async {
    V2TimValueCallback<V2TimMsgCreateInfoResult> createTextMessageRes =
        await v2TIMManager.getMessageManager().createTextMessage(text: message);
    if (createTextMessageRes.code == 0) {
      // 文本信息创建成功
      String? id = createTextMessageRes.data?.id;
      // 发送文本消息
      // 在sendMessage时，若只填写receiver则发个人用户单聊消息
      //                 若只填写groupID则发群组消息
      //                 若填写了receiver与groupID则发群内的个人用户，消息在群聊中显示，只有指定receiver能看见
      V2TimValueCallback<V2TimMessage> sendMessageRes = await v2TIMManager.getMessageManager().sendMessage(
          id: id!,
          // 创建的messageid
          receiver: receiverId ?? "",
          // 接收人id
          groupID: groupId ?? "",
          // 接收群组id
          priority: MessagePriorityEnum.V2TIM_PRIORITY_DEFAULT,
          // 消息优先级
          onlineUserOnly: false,
          // 是否只有在线用户才能收到，如果设置为 true ，接收方历史消息拉取不到，常被用于实现“对方正在输入”或群组里的非重要提示等弱提示功能，该字段不支持 AVChatRoom。
          isExcludedFromUnreadCount: false,
          // 发送消息是否计入会话未读数
          isExcludedFromLastMessage: false,
          // 发送消息是否计入会话 lastMessage
          needReadReceipt: false,
          // 消息是否需要已读回执（只有 Group 消息有效，6.1 及以上版本支持，需要您购买旗舰版套餐）
          offlinePushInfo: OfflinePushInfo(),
          // 离线推送时携带的标题和内容
          cloudCustomData: "",
          // 消息云端数据，消息附带的额外的数据，存云端，消息的接收者可以访问到
          localCustomData: "" // 消息本地数据，消息附带的额外的数据，存本地，消息的接收者不可以访问到，App 卸载后数据丢失
          );
      print("sendMessageRes.code   ${sendMessageRes.code} ${sendMessageRes.desc}");
      if (sendMessageRes.code == 0) {
        onMessageSent(sendMessageRes.data!);
      }
    }
  }

{{< /highlight >}}

Here is the chat_single_screen calling this method

{{< highlight dart "linenos=table" >}}

  void sendMessage(String text) async {
    await IMHelper.sendTextMessage(text, receiverId: userId, (sentMessage) {
      Provider.of<MessageProvider>(context, listen: false).clearSearchSection();
      insertMessage(sentMessage);
    });
  }
{{< /highlight >}}


### Send an image Message 


In this method, picking an image or taking a photo requires another plugin called `image_picker`.

Pick image/take photo in chat_single_screen.dart
{{< highlight java "linenos=table" >}}
  Future<void> openAlbum() async {
    final pickedFile = await FileHelper.pickImageFromGalleryPath(_picker);
    if (pickedFile != null) {
      String path = pickedFile.path;
      if (FileHelper.isImage(path) == true) {
        await IMHelper.sendImageMessage(path, (sentMessage) {
          insertMessage(sentMessage);
        }, receiverId: userId);
      }
    }
  }



  Future<void> openCamera() async {
    String? path = await FileHelper.pickImageFromCameraPath(_picker);
    if (path != null) {
      await IMHelper.sendImageMessage(path, (sentMessage) {
        insertMessage(sentMessage);
      }, receiverId: userId);
    }
  }
{{< /highlight >}}

`pickImageFromGalleryPath` and `pickImageFromCameraPath` are two methods I encapsulated for taking a photo or opening the album.


IMhelper.dart

{{< highlight java "linenos=table" >}}
  static Future<void> sendImageMessage(String imagePath, Function(V2TimMessage) onMessageSent,
      {String? receiverId, String? groupId}) async {
    V2TimValueCallback<V2TimMsgCreateInfoResult> createImageMessageRes =
        await v2TIMManager.getMessageManager().createImageMessage(
              imagePath: imagePath,
            );
    if (createImageMessageRes.code == 0) {
      String? id = createImageMessageRes.data?.id;

      V2TimValueCallback<V2TimMessage> sendMessageRes = await v2TIMManager
          .getMessageManager()
          .sendMessage(id: id!, receiver: receiverId ?? "", groupID: groupId ?? "");
      if (sendMessageRes.code == 0) {
        onMessageSent(sendMessageRes.data!);
      }
    }
  }


{{< /highlight >}}



### Send a voice Message 

This requirement should take a little time to figure out.
Plugins needed for the voice recorder: `audioplayers`, `record`

Generally, press the button to start the voice recording, release the button to save the voice recording, and get the path to send the voice message.

In Flutter, the method to monitor gestures I use is `Listener` (I have more details when implementing this feature. For example, to imitate WeChat voice recording, also need to monitor the cancel gesture.), but the easiest way is to use `GestureDetector`. 

It provides two methods that can be used: `onLongPress` and `onLongPressUp`.

MessageProvider.dart
{{< highlight java "linenos=table" >}}
  final AudioRecorder _audioRecorder = AudioRecorder();
  late int _recordDuration = 0;
  Timer? _timer;
  //record voice
  void startTimer() {
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (Timer t) {
      _recordDuration++;
    });
    notifyListeners();
  }

  // record voice sound ===========start==============
  Future<void> startRecord() async {
    _timer?.cancel();
    _recordDuration = 0;
    try {
      if (await _audioRecorder.hasPermission()) {
        const encoder = AudioEncoder.aacLc;
        if (!await AudioHelper.isEncoderSupported(encoder, _audioRecorder)) {
          return;
        }
        const config = RecordConfig(encoder: encoder, numChannels: 1);
        await AudioHelper.recordFile(_audioRecorder, config);
        _recordDuration = 0;
        startTimer();
      }
    } catch (e) {
      print("error $e");
    }
  }

  Future<void> cancelRecord() async {
    ToastUtils.showSuccessToast("cancel");
    await _audioRecorder.stop();
    _timer?.cancel();
    _recordDuration = 0;
    notifyListeners();
  }

  Future<void> stopRecord(Function(String path, int duration) sendVoiceMessage) async {
    final path = await _audioRecorder.stop();
    if (_recordDuration < 1) {
      ToastUtils.showErrorToast("too short");
      _timer?.cancel();
      _recordDuration = 0;
      return;
    }

    if (path != null) {
      sendVoiceMessage(path, _recordDuration);
    }
    _timer?.cancel();
    _recordDuration = 0;
  }
  // record voice sound ============end===============


{{< /highlight >}}

After stop recording, then send the voice message.

chat_single_screen.dart
{{< highlight java "linenos=table" >}}

  Future<void> sendVoiceMessage(String path, int duration) async {
    ToastUtils.showLoading();

    await IMHelper.sendVoiceMessage(path, (sentMessage) {
      insertMessage(sentMessage);
      ToastUtils.closeLoading();
    }, duration, receiverId: userId);
  }
{{< /highlight >}}



IMhelper.dart
{{< highlight java "linenos=table" >}}
  static Future<void> sendVoiceMessage(String soundPath, Function(V2TimMessage) onMessageSent, int duration,
      {String? receiverId, String? groupId}) async {
    V2TimValueCallback<V2TimMsgCreateInfoResult> createSoundMessageRes =
        await v2TIMManager.getMessageManager().createSoundMessage(soundPath: soundPath, duration: duration);

    if (createSoundMessageRes.code == 0) {
      String? id = createSoundMessageRes.data?.id;

      V2TimValueCallback<V2TimMessage> sendMessageRes = await v2TIMManager
          .getMessageManager()
          .sendMessage(id: id!, receiver: receiverId ?? "", groupID: groupId ?? "");
      if (sendMessageRes.code == 0) {
        onMessageSent(sendMessageRes.data!);
      }
    }
  }
{{< /highlight >}}


### Send a video Message 

The video picker also requires the `image_picker` plugin, and you should choose `pickMedia` (otherwise, you can only pick images). Another plugin needed is `mime`, which can get all the information about the video, and `video_thumbnail` to generate a snapshot that can be used as a preview image.

For video messages, need to get the file extension, duration, snapshot path, and video file path.

file_helper.dart
{{< highlight java "linenos=table" >}}

  static Future<XFile?> pickImageFromGalleryPath(ImagePicker picker) async {
    // final pickedFile = await picker.pickImage(source: ImageSource.gallery);
    final pickedFile = await picker.pickMedia(
      maxWidth: 1920,
      maxHeight: 1080,
    );
    if (pickedFile != null) {
      return pickedFile;
    } else {
      return null;
    }
  }
{{< /highlight >}}



chat_single_screen.dart
{{< highlight java "linenos=table" >}}
  Future<void> openAlbum() async {
    final pickedFile = await FileHelper.pickImageFromGalleryPath(_picker);
    if (pickedFile != null) {
      String path = pickedFile.path;
      if (FileHelper.isImage(path) == true) {
        // send image
      } else {
        String? thumbnailPath = await FileHelper.generateSnapshot(path); // get preview image
        double? duration = await FileHelper.getVideoDuration(path);
        String? mineType = await FileHelper.getVideoMimetype(path);
        int intDuration = (duration ?? 0).toInt();
        if (thumbnailPath != null) {
          await IMHelper.sendVideoMessage(path, mineType ?? "mov", intDuration, thumbnailPath, (sentMessage) {
            insertMessage(sentMessage);
          }, receiverId: userId);
        }
      }
    }
  }
{{< /highlight >}}



IMhelper.dart
{{< highlight java "linenos=table" >}}
  // video message
  static Future<void> sendVideoMessage(
      String videoFilePath, String type, int duration, String snapshotPath, Function(V2TimMessage) onMessageSent,
      {String? receiverId, String? groupId}) async {
    V2TimValueCallback<V2TimMsgCreateInfoResult> createVideoMessageRes =
        await v2TIMManager.getMessageManager().createVideoMessage(
              videoFilePath: videoFilePath,
              type: type,
              duration: duration,
              snapshotPath: snapshotPath,
            );

    if (createVideoMessageRes.code == 0) {
      String? id = createVideoMessageRes.data?.id;

      V2TimValueCallback<V2TimMessage> sendMessageRes = await v2TIMManager
          .getMessageManager()
          .sendMessage(id: id!, receiver: receiverId ?? "", groupID: groupId ?? "");
      if (sendMessageRes.code == 0) {
        onMessageSent(sendMessageRes.data!);
      }
    }
  }
{{< /highlight >}}



## Monitor the uploading progress


In the Message class, there is a `MessageListener`. Within this class, `onSendMessageProgress` will monitor the progress of uploading. This is very useful when uploading videos, as you can use the snapshot and progress to display the uploading progress on the chat screen. Many chat apps do this to inform users about the progress of media uploads.

Maybe my method is not a perfect solution. I created a custom message type and inserted it into the message list.
Once the progress is 100, need to delete this custom message.

chat_single_screen.dart
{{< highlight java "linenos=table" >}}
  void setupMessageListener() async {
    await IMHelper.createMessageListener(
      ....
      onSendMessageProgress: (V2TimMessage message, int progress) {
        print("文件上传进度回调 $progress");

        String messageId = message.msgID!;
        String path = "";
        if (message.elemType == MessageElemType.V2TIM_ELEM_TYPE_VIDEO) {
          path = message.videoElem!.snapshotPath!;
        } else if (message.elemType == MessageElemType.V2TIM_ELEM_TYPE_SOUND) {
        } else if (message.elemType == MessageElemType.V2TIM_ELEM_TYPE_IMAGE) {
          path = message.imageElem!.path!;
        }
        if (path == "") return;
        if (progress == 100) {
          //  delete
          removeMessage(messageId);
          return;
        }
        V2TimCustomElem progressMessage = V2TimCustomElem(data: messageId, desc: path, extension: progress.toString());
        V2TimMessage newItem = V2TimMessage(
            msgID: messageId,
            sender: message.sender,
            elemType: MessageElemType.V2TIM_ELEM_TYPE_CUSTOM,
            customElem: progressMessage,
            timestamp: message.timestamp);

        insertMessage(newItem, isUpload: true);
      },
    );
  }

{{< /highlight >}}


## Handle Time 

If some messages are sent within the same minute, the time needs to be displayed only once.


Message_helper.dart
{{< highlight java "linenos=table" >}}
  static Future<List<V2TimMessage>> processMessages(List<V2TimMessage> messages) async {
    if (messages.isEmpty) return messages;

    List<V2TimMessage> processedMessages = [];

    for (var i = 0; i < messages.length; i++) {
      var orgMessage = messages[i];
      var message = orgMessage;
      message = await handleDownloadNetworkMessage(message);

      processedMessages.add(message);
      bool isLastMessageInMinuteBlock =
          (i + 1 == messages.length) || !DateHelper.isSameMinute(message.timestamp!, messages[i + 1].timestamp!);

      if (isLastMessageInMinuteBlock) {
        String formatTime = DateHelper.formatTime(message.timestamp!);
        var timeMessage = V2TimMessage(
          msgID: 'time_${message.msgID}',
          timestamp: message.timestamp,
          sender: null,
          customElem: V2TimCustomElem(data: "time", desc: formatTime),
          elemType: MessageElemType.V2TIM_ELEM_TYPE_CUSTOM,
        );
        // Check if the last added message is a duplicate time message
        if (processedMessages.isNotEmpty &&
            processedMessages.last.customElem?.desc == timeMessage.customElem?.desc &&
            processedMessages.last.elemType == MessageElemType.V2TIM_ELEM_TYPE_CUSTOM) {
          processedMessages.removeLast();
        }
        processedMessages.add(timeMessage);
      }

    }
 
    return processedMessages;
  }
{{< /highlight >}}


date_helper.dart
{{< highlight java "linenos=table" >}}

  static bool isSameMinute(int a, int b) {
    DateTime dateTimeA = DateTime.fromMillisecondsSinceEpoch(a * 1000);
    DateTime dateTimeB = DateTime.fromMillisecondsSinceEpoch(b * 1000);

    return dateTimeA.year == dateTimeB.year &&
        dateTimeA.month == dateTimeB.month &&
        dateTimeA.day == dateTimeB.day &&
        dateTimeA.hour == dateTimeB.hour &&
        dateTimeA.minute == dateTimeB.minute;
  }

{{< /highlight >}}

## Conclusion ✊

It's quite a big task and still needs to be polished and improved in terms of performance, not only in functionality but also in UI. The next task is to support grop chat.

In this article, I didn't include any UI code. If I have more time, I'll probably write another article about custom UI.

