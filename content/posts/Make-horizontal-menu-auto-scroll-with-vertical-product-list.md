---
title: "Make Horizontal Menu Auto Scroll With Vertical Product List in flutter"
date: 2024-02-15T14:46:55Z
lastmod: 2024-02-15T14:46:55Z
subTitle: ""
description: "My article is referencing <link>. However, in my case, the width of each category’s name and the height of each product card are dynamic and subject to slight changes. Now, let’s proceed."
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["flutter"]
categories: ["Flutter","tutorial"]
cover:
    position: <left,right>
    image: "https://i.imgur.com/kx6kzD0.png"
    alt: "<alt text>"
    caption: "<text>"
---
> My article is referencing https://stackoverflow.com/questions/67195205/how-to-make-horizontal-menu-auto-scroll-with-vertical-product-list-in-flutter. However, in my case, the width of each category's name and the height of each product card are dynamic and subject to slight changes. Now, let's proceed.

## The final result
<div class="polaroid">
  <a data-fancybox="gallery" data-src="https://i.imgur.com/N1L4jL5.gif">
      <img src="https://i.imgur.com/N1L4jL5.gif"/>
  </a>
</div>

## My Logic

Well, based on that article, I came up with some innovations. In order to explain easily, I have drawn a draft below:

{{< highlight  text "linenos=table" >}}
category1 | category2 | category3 ....

category1-section (section1 --> height: 300) 
 ---product1-1
 ---product1-2
 ---product1-3
 ---product1-4
category2-section (section2 --> height: 120)
 ---product2-1
 ---product2-2
category3-section (section4 --> height: 250)
 ---product3-1
 ---product3-2
 ---product3-3
.
.
.
{{< /highlight >}}
The UI looks like this. The basic logic involves calculating the height of each category and its products using the `scrollController.addListener` function to monitor the current scroll offset. For instance, if the height of the section for category1 is 300 and the height of the section for category2 is 120, when the offset reaches 300, it implies that the currentIndex is 1, and the interface should jump to the position of category2. The currentIndex indicates horizontal menu.

The challenge lies in calculating the height of each section. I have set up a unique key for each category-section and know the number of products in each section. The formula is `height of category1-section + height of product card * count`, the name of each menu is `width of text`. 


## Code Part

###  Initialize 

Initialize variables
{{< highlight java "linenos=table" >}}
final ScrollController _scrollController = ScrollController();
final ScrollController _scrollControllerCategory = ScrollController();
final List<double> _categoryOffsets = <double>[];
late List<double> _productOffsets = <double>[];
{{< /highlight >}}

### Add Listener to know the offset

Because horizontal and vertical scrolling need to be synchronized with each other. So there are two ScrollController, one is for horizontal list(product), another is for vertical list(menu)

{{< highlight java "linenos=table" >}}
 
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        currentIndex = 0;
        _scrollController.addListener(() {
          setCategoryOffsets();
          setProductOffsets();
          final double offset = _scrollController.offset;

          for (int i = 0; i < _productOffsets.length; i++) {
            if (offset <= _productOffsets[i]) {
              if (currentIndex != i) {
                if (i > 0) {
                  double diff1 = (offset - _productOffsets[i - 1]).abs();
                  double diff2 = (offset - _productOffsets[i]).abs();
                  if (diff1 > diff2) return;
                }
                double maxOffset = _scrollControllerCategory.position.maxScrollExtent + 100;
                if (_categoryOffsets[i] <= maxOffset) {
                  _scrollControllerCategory.animateTo(
                    (_categoryOffsets[i]).toDouble(),
                    duration: const Duration(milliseconds: 500),
                    curve: Curves.easeInOut,
                  );
                }
                setState(() => currentIndex = i);
              }

              break;
            }
          }
        });
      }
    });
  }

{{< /highlight >}}

### Calculate offset(height) of each product's section
Here the format of cateProductList roughly looks like
{{< highlight json "linenos=table" >}}
[
    {
        "id": 1,
        "name": "category 1",
        "key": "GlobalKeykey1",
        "product": [
            {
                "id": 1,
                "name": "product name1"
            },
            {
                "id": 2,
                "name": "product name2"
            },
            {
                "id": 3,
                "name": "product name3"
            }
        ]
    },
    {
        "id": 2,
        "name": "category 2",
        "key": "GlobalKeykey2",
        "product": [
            {
                "id": 4,
                "name": "product name4"
            },
            {
                "id": 5,
                "name": "product name5"
            }
        ]
    }
]
{{< /highlight >}}

The first offset is 0, the second is first + itself.


{{< highlight java "linenos=table" >}}
  final double _productItemExtent = 122;
  late double _productItemHeight = 120;

  void setProductOffsets() {
    double tmp = !ResponsiveHelper.isMobile() ? 150 : 120;
    if (_productOffsets.isNotEmpty && _productItemHeight == tmp) return;
    _productItemHeight = tmp;
    _productOffsets = [];
    WidgetsBinding.instance.addPostFrameCallback((_) {
      List<CategoryProductsModel> cateProductList = getCateProductList();
      for (int i = 1; i <= (cateProductList).length; i++) {
        CategoryProductsModel categoryProductsModel = cateProductList[i - 1];
        final double prevOffset = i == 1 ? _productItemExtent : _productOffsets[i - 2];
        _productOffsets.add(prevOffset + (Dimensions.paddingSizeSmall * 2 + Dimensions.paddingSizeLarge * 3 + getHeightOfContainer(GlobalObjectKey(categoryProductsModel.id!)) + (_productItemHeight) * (categoryProductsModel.products ?? []).length));
      }
    });
  }

  double getHeightOfContainer(GlobalKey key) {
    RenderBox renderBox = key.currentContext!.findRenderObject() as RenderBox;
    return renderBox.size.height;
  }

{{< /highlight >}}

### Calculate offset(height) of each category
Becasue of GlobalKey, It's easier to know category' width.
{{< highlight java "linenos=table" >}}
  void setCategoryOffsets() {
    if (_categoryOffsets.isNotEmpty) return;
    List<CategoryProductsModel> cateProductList = getCateProductList();
    _categoryOffsets.add(0);
    for (int i = 1; i <= (cateProductList).length; i++) {
      CategoryProductsModel categoryProductsModel = cateProductList[i - 1];
      double cateWidth = getWidthOfContainer(categoryProductsModel.key!);
      double prevOffset = _categoryOffsets[i - 1];
      _categoryOffsets.add(prevOffset + cateWidth);
    }
  }
  double getWidthOfContainer(GlobalKey key) {
    RenderBox renderBox = key.currentContext!.findRenderObject() as RenderBox;
    return renderBox.size.width;
  }

{{< /highlight >}}

## Part of UI 
I delete some not important part, like styles, padding....

### Category List, Horizontal Scroll

Just remind:
{{< highlight java "linenos=table" >}}
currentIndex = index;
final context = GlobalObjectKey(categoryProductsModel.id!).currentContext!;
Scrollable.ensureVisible(context, duration: const Duration(milliseconds: 800), curve: Curves.ease);
{{< /highlight >}}
The code above indicates that clicking the category name will result in jumping to the corresponding product list section.

{{< highlight java "linenos=table" >}}
// category view

 SingleChildScrollView(
    scrollDirection: Axis.horizontal,
    controller: scrollController,
    physics: const ScrollPhysics(
        parent: AlwaysScrollableScrollPhysics(),
    ),
    child: Row(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: List.generate(categories.length, (index) {
        CategoryProductsModel categoryProductsModel = categories[index];
        return Padding(
            key: categories[index].key!,
            child: Container(
                height: 35,
                padding: const EdgeInsets.all(8.0),
                decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12.0),
                color: currentIndex == index ? Theme.of(context).primaryColor : Colors.transparent,
                ),
                child: InkWell(
                onTap: () {
                    currentIndex = index;
                    final context = GlobalObjectKey(categoryProductsModel.id!).currentContext!;
                    Scrollable.ensureVisible(context, duration: const Duration(milliseconds: 800), curve: Curves.ease);
                },
                child: Text(
                    categories[index].name!,
                    style: textMedium.copyWith(
                    color: currentIndex == index ? Colors.white : Colors.black,
                    ),
                ),
                )),
        );
        }),
    ),
)
{{< /highlight >}}


### Product List Vertical Scroll

{{< highlight java "linenos=table" >}}
 Column(
    children: List.generate(categories.length, (index) {
    CategoryProductsModel categoryProductsModel = categories[index];
    int productLen = (categoryProductsModel.products ?? []).length;
    return Column(
    children: [
        Container(
        alignment: Alignment.topLeft,
        child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
            Container(
                key: GlobalObjectKey(categoryProductsModel.id!),
                alignment: Alignment.centerLeft,
                child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                    Text(
                    categoryProductsModel.name 
                    ),
                    Text(
                    categoryProductsModel.description,
                    ),
                ],
                ),
            ),
            // product listview
            ListView.builder(
                controller: ScrollController(),
                physics: const NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                itemCount: productLen,
                itemBuilder: (BuildContext context, int indexProduct) {
                Product product = categoryProductsModel.products![indexProduct];
                return ProductWidget(
                    product: product,
                );
                },
            ),
            ],
        ),
        ),
    ],
    );
}));

{{< /highlight >}}

Okay, everything has done. 