// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCEv69BWpYRY-QN7AGvtO-C_C2SsZd6MbM",
    authDomain: "dp-restaurant-database.firebaseapp.com",
    databaseURL: "https://dp-restaurant-database.firebaseio.com",
    projectId: "dp-restaurant-database",
    storageBucket: "dp-restaurant-database.appspot.com",
    messagingSenderId: "662891647449",
    appId: "1:662891647449:web:1b923513033c43dbe309c8",
    measurementId: "G-F8XX7MQNSS"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.database();
const googlemap_url = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBef7U76Qgh1iXNYdFEyeD1fATLJsn9GRA&maptype=roadmap&language=en"

var gl_category;
var gl_location;
var gl_price_min;
var gl_price_max;
var autocomplete_flag = 0;



$(document).ready(function() {
    set_price();
    bindEvent();
});

function match(search_name){
    var count = 0;
    var restaurant_info_pairs = pairs;
    for(var i = 0; i < restaurant_info_pairs.length; i++){
        if(search_name == restaurant_info_pairs[i].name){
            restaurant_info_pairs = restaurant_info_pairs.filter(pair => pair.name == search_name);
            // var category = restaurant_info_pairs[0].category;
            // var location = restaurant_info_pairs[0].location;
            // var price = restaurant_info_pairs[0].price;
            break;
        }
        count++;
    }
    if(count == restaurant_info_pairs.length){
        return {result:false};
    }
	return {
		result: true
	};
}

function submit_name(){
    var search_name = $("#restaurant_name").val();
    var result = match(search_name);
    if(result.result){
        $(window).attr('location',"restaurant.html");
    }else{
        alert("The restaurant you checked does not exist,please try again!");
    }
}

function submit_location(){
    var gl_location = $('#location_name').val();
    db.ref('/location/').push({'location':gl_location});
    $("iframe").attr('src', googlemap_url + `&q=${gl_location}`+ `&zoom=17`);
}

function submit_search(){
   
    
    db.ref('/category/').once('value', function(snapshot){
        if(snapshot.val()!= null){    
            var keys = Object.keys(snapshot.val());
            var recent = keys[keys.length - 1];
            var category = snapshot.val()[recent];
            category = category.category;
            if(category == "Vegetarian"){
                db.ref('/flag/').push({"name":'Vegetarian_flag'});
                //Vegetarian_flag = 1;
            }else if(category == "Vegan"){
                db.ref('/flag/').push({"name":'Vegan_flag'});
                //Vegan_flag = 1;
            }
        }
    })
    .then(function(){
        db.ref(`/category/`).remove();
    })
    
    db.ref('/location/').once('value', function(snapshot){
        if(snapshot.val()!= null){    
            var keys = Object.keys(snapshot.val());
            var recent = keys[keys.length - 1];
            var location = snapshot.val()[recent];
            location = location.location;
            if(location == "Seoul"){
                db.ref('/flag/').push({"name":'Seoul_flag'});
                //Seoul_flag = 1;
            }else if(location == "Busan"){
                db.ref('/flag/').push({"name":'Busan_flag'});
                //Busan_flag = 1;
            }
        }
    })
    .then(function(){
        db.ref(`/location/`).remove();
    })

    db.ref('/price/').once('value', function(snapshot){
        if(snapshot.val()!= null){    
            var keys = Object.keys(snapshot.val());
            var max = keys[keys.length - 1];
            var min = keys[keys.length - 2];
            var price_max = snapshot.val()[max];
            var price_min = snapshot.val()[min];
            price_max = price_max.price_max;
            price_min = price_min.price_min;
            if(price_min <= 10000 && price_max >= 16000){
                db.ref('/flag/').push({"name":'Vegetarian_price_flag'});
                //Vegetarian_price_flag = 1;
            }else if(price_min <= 4000 && price_max >= 10000){
                db.ref('/flag/').push({"name":'Vegan_price_flag'});
                //Vegan_price_flag = 1;
            }else{
                alert("The choose range of price is not found ,please try again!");
            }
        }
    })
    .then(function(){
        db.ref(`/price/`).remove();
    })
    // if(Vegetarian_flag && Seoul_flag && Vegetarian_price_flag){
    //     $(window).attr('location',"vegetarian.html");
    // }else if(Vegan_flag && Busan_flag && Vegan_price_flag){
    //     $(window).attr('location',"vegan.html");
    // }else{
    //     alert("No match result,please try again!");
    // }
    db.ref('/flag/').once('value', function(snapshot){
        if(snapshot.val()!= null){    
            var keys = Object.keys(snapshot.val());
            var price_idx = keys[keys.length - 1];
            var location_idx = keys[keys.length - 2];
            var category_idx = keys[keys.length - 3];
            var price = snapshot.val()[price_idx];
            var location = snapshot.val()[location_idx];
            var category = snapshot.val()[category_idx];
            price = price.name;
            location = location.name;
            category = category.name;
            if(price == "Vegetarian_price_flag" && location == "Seoul_flag" && category == "Vegetarian_flag"){
                $(window).attr('location',"vegetarian.html");
            }else if(category == "Vegan_flag" && location== "Busan_flag" && price == "Vegan_price_flag"){
                $(window).attr('location',"vegan.html");
            }else{
                alert("No match result,please try again!");
            }
        }
    })
    .then(function(){
        db.ref(`/flag/`).remove();
    })

}

function bindEvent(){
    $('.iconOpenMagnifyingGlass_restaurant').click(function(){
        submit_name();
    })

    $('#restaurant_name').keydown(function(e){
        if(e.keyCode == 13){
          submit_name();
        } 
    }); 

    $('#confirm').click(function(){
        submit_location();
    })

    $('#location_name').keydown(function(e){
        if(e.keyCode == 13){
          submit_location();
        } 
    }); 

    $('#search').click(function(){
        submit_search();
    })

    var restaurant_info_pairs = pairs;
    var name_restaurant = restaurant_info_pairs.map(pair => pair.name);

    $('#restaurant_name').autocomplete({
      minLength: 2,
      source: function(request, response) {
        var term = request.term;
        autocomplete_flag = 0;
        var data = handleAutocomplete(term); 
        response(data);
      },
      select: function(event, ui) {
        var name = ui.item.value;
        $(this).val("").focus();
        return false;
      }
    });

    var location_restaurant = restaurant_info_pairs.map(pair => pair.location);
    $('#location_name').autocomplete({
      minLength: 2,
      source: function(request, response) {
        var term = request.term;
        autocomplete_flag = 1;
        var data = handleAutocomplete(term); 
        response(data);
      },
      select: function(event, ui) {
        var name = ui.item.value;
        $(this).val("").focus();
        return false;
      }
    });
    
    
    function recursiveListUpdate(restaurant, keywords) {
      newList = [];
      restaurant.forEach(function(element) {
          if (element.toLowerCase().indexOf(keywords[counter].toLowerCase()) >= 0) {
              newList.push(decodeURI(element)); 
          }
      });
      counter++;
      if (counter == keywords.length) {
          return newList;
      }
      return recursiveListUpdate(newList, keywords);
    }
    
    function handleAutocomplete(term) {
      var str = term;
      var keywordsFromNameInput = str.split(" "); 
      counter = 0; 
      if(!autocomplete_flag)
        return recursiveListUpdate(name_restaurant, keywordsFromNameInput);
      else
      return recursiveListUpdate(location_restaurant, keywordsFromNameInput);
    }

    $("[name='category_check']").click(function(){
        gl_category = this.value;
        db.ref('/category/').push({'category':gl_category});
        $("[name='category_check']").each(function(){ 
            if( $(this).val() != gl_category){
                $(this).removeAttr("checked");
            }
		});
    })
}


function set_price(){
    $("#price-range").slider({
		unit: "₩",
		beyondMax: true,
		beyondMin: true,
		firstWidth: 34,
		lastWidth: 23,
		scale: [
			{
				key: 0,
				value: [500, 500, 500, 1]
			},
			{
				key: 2000,
				value: [500, 500, 500, 1]
			},
			{
				key: 4000,
				value: [500, 500, 500, 1]
			},
			{
				key: 6000,
				value: [500, 500, 500, 1]
			},
			{
				key: 8000,
				value: [500, 500, 500, 1]
			},
			{
				key: 10000,
				value: [500, 500, 500, 1]
			},
			{
				key: 12000,
				value: [500, 500, 500, 1]
			},
			{
				key: 14000,
				value: [500, 500, 500, 1]
			},
			{
				key: 16000,
				value: [500, 500, 500, 1]
			},
			{
				key: 18000,
				value: [500, 500, 500, 1]
			},
			{
				key: 20000,
				value: 0.5
			},
			{
				key: 20000
			}
		]
		})
	.on("changed", function(e, args) {
        var min = args.value.leftValue;
        var max = args.value.rightValue;
        db.ref('/price/').push({"price_min":min});
        db.ref('/price/').push({"price_max":max});
        console.log(min,max);
        
	});
	$("#price-range").data("slider").setRange({
		leftValue: 0,
		rightValue: 20000
	});
}

//slider start
(function(){
    $.fn.slider = function(option) {
    return this.each(function() {
        var $this = $(this),
            data = $(this).data("slider");
        var options = $.extend({}, $.fn.slider.defaults, $this.data(), option);
        if (data == null) data = new Slider($this, options);
        $(this).data("slider", data);
        if (typeof option === "string") {
            data[option]()
        }
    })
};

function Slider($elem, option) {
    this.$elem = $elem;
    this.options = option;
    this.$leftButton = $(".btn-left", $elem);
    this.$rightButton = $(".btn-right", $elem);
    this.$selectedbar = $(".slide-selected", $elem);
    this.$tip = $(".tip", $elem);
    this.$tipContent = $(".tip-content", $elem);
    this.$fullbar = $(".price-range-slider", $elem);
    this.$validbar = $(".bg-darkgrey,.bg-darkgrey-hand", $elem);
    this.$lowTip = $(".low01", $elem);
    this.$highTip = $(".high01", $elem);
    this.noValidbar = false;
    if (this.$validbar.size() == 0) {
        this.$validbar = this.$fullbar;
        this.noValidbar = true
    }
    this._fullbarWidth = this.$fullbar.width();
    this._$activeButton = null;
    this._allowDrag = false;
    this._buttonWidth = this.$leftButton.width();
    this._unit = this.options.unit;
    this._beyondMax = this.options.beyondMax;
    this._beyondMin = this.options.beyondMin;
    this._minusLeft = null;
    this._scale = this.options.scale;
    this._max = this._scale == null ? this.options.max : this._scale[this._scale.length - 1].key;
    this._min = this._scale == null ? this.options.min : this._scale[0].key;
    this._lastValue = null;
    this._moveValue = null;
    this._mouseDownPageX = null;
    this._canTouch = function() {
        try {
            document.createEvent("TouchEvent");
            return true
        } catch (e) {
            return false
        }
    }();
    this._tempValue = [];
    this._rangeValue = null;
    this._init()
}
Slider.prototype = {
    _initShow: function() {
        this.$leftButton.show();
        this.$rightButton.show();
        this.$tip.show();
        this.$validbar.show();
        this.$selectedbar.show()
    },
    _init: function() {
        jQuery.browser={};(function(){jQuery.browser.msie=false; jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)./)){ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
        if ($.browser.msie == true && $.browser.version < 9) {
            $("*", this.$elem).prop("unselectable", true)
        }
        this.$leftButton.add(this.$rightButton).on("mousedown.slider", $.proxy(this._mousedownHandler, this));
        this.$fullbar.add(this.$selectedbar).on("click.slider", $.proxy(this._validbarClickHandler, this));
        $(document.body).on("mouseup.slider", $.proxy(this._mouseupHandler, this));
        $(document.body).on("mousemove.slider", $.proxy(this._mousemoveHandler, this));
        if (this._canTouch == true) {
            this.$leftButton.add(this.$rightButton).on("touchstart.slider", $.proxy(this._mousedownHandler, this));
            $(document.body).on("touchend.slider", $.proxy(this._mouseupHandler, this));
            $(document.body).on("touchmove.slider", $.proxy(this._mousemoveHandler, this))
        }
        $("a", this.$elem).click(function() {
            return false
        });
        this._initShow();
        this._initScale()
    },
    _initScale: function() {
        for (var i = 0; i < this._scale.length - 1; i++) {
            var scale = this._scale[i];
            var leftValueArray = [];
            leftValueArray.push(scale.key);
            for (var j = 0; j < scale.value.length - 1; j++) {
                leftValueArray.push(leftValueArray[leftValueArray.length - 1] + scale.value[j])
            }
            scale.leftValue = leftValueArray
        }
    },
    _setLowHightTip: function() {
        var validBarLeft = this.$validbar.position().left + this.$fullbar.position().left;
        var validBarWidth = this.$validbar.width();
        var leftButtonLeft = this.$leftButton.position().left;
        var rightButtonLeft = this.$rightButton.position().left;
        if (leftButtonLeft < validBarLeft - this._buttonWidth / 2 - 1) {
            this.$lowTip.show()
        } else {
            this.$lowTip.hide()
        }
        if (rightButtonLeft > validBarLeft + validBarWidth - this._buttonWidth / 2 + 1) {
            this.$highTip.show()
        } else {
            this.$highTip.hide()
        }
        if (rightButtonLeft < validBarLeft - this._buttonWidth / 2 || leftButtonLeft > validBarLeft + validBarWidth - this._buttonWidth / 2) {
            this.$lowTip.show();
            this.$highTip.show();
            this.$lowTip.find("i").addClass("icon-dian-blue");
            this.$highTip.find("i").addClass("icon-dian-blue")
        } else {
            this.$lowTip.find("i").removeClass("icon-dian-blue");
            this.$highTip.find("i").removeClass("icon-dian-blue")
        }
    },
    setTipPrefix: function(prefix) {
        $(".bg-darkgrey-hand", this.$elem).prop("title", prefix + "可选区间" + this._rangeValue.leftValue + "-" + this._rangeValue.rightValue + this._unit)
    },
    _validbarClickHandler: function(e) {
        if ($(e.target).hasClass("low01") || $(e.target).hasClass("high01")) {
            return
        }
        var clickX = e.pageX - this.$fullbar.offset().left;
        var value = this.getValue();
        var leftX = value.leftX;
        var rightX = value.rightX;
        var newLeft = clickX;
        newLeft = this._getFixedPosition(newLeft).leftX;
        newLeft = newLeft - this._buttonWidth / 2;
        var newLeftButtonLeft = null;
        var newRightButtonLeft = null;
        var animateButton = null;
        if (clickX <= leftX + (rightX - leftX) / 2) {
            animateButton = this.$leftButton;
            newLeftButtonLeft = newLeft;
            newRightButtonLeft = this.$rightButton.position().left
        } else {
            animateButton = this.$rightButton;
            newRightButtonLeft = newLeft;
            newLeftButtonLeft = this.$leftButton.position().left
        }
        var newWidth = newRightButtonLeft - newLeftButtonLeft;
        if (animateButton == this.$leftButton && this.$rightButton.position().left > this._fullbarWidth - 15 && newLeft + this.$fullbar.position().left > this._fullbarWidth - 15) {
            return
        }
        animateButton.css({
            left: newLeft + this.$fullbar.position().left
        });
        this._setLowHightTip();
        this._setTipContent();
        this._setTipPosition();
        this._setSelectedbar();
        this._fireChangeEvent()
    },
    _mousedownHandler: function(e) {
        var pageX = null;
        if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0]) {
            pageX = e.originalEvent.touches[0].pageX
        } else {
            pageX = e.pageX
        }
        this._allowDrag = true;
        this._$activeButton = $(e.target);
        if (this._$activeButton[0] == this.$leftButton[0]) {
            this.$leftButton.css("zIndex", 20);
            this.$rightButton.css("zIndex", 10)
        } else {
            this.$leftButton.css("zIndex", 10);
            this.$rightButton.css("zIndex", 20)
        }
        this._minusLeft = pageX - this._$activeButton.position().left;
        if (this.$leftButton.position().left == this.$rightButton.position().left) {
            this._mouseDownPageX = pageX
        } else {
            this._mouseDownPageX == null
        }
        return false
    },
    _mousemoveHandler: function(e) {
        if (this._allowDrag) {
            var pageX = null;
            if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0]) {
                pageX = e.originalEvent.touches[0].pageX
            } else {
                pageX = e.pageX
            }
            if (this._mouseDownPageX != null) {
                var moveRight = pageX > this._mouseDownPageX;
                if (moveRight == true) {
                    this._$activeButton = this.$rightButton;
                    this.$leftButton.css("zIndex", 10);
                    this.$rightButton.css("zIndex", 20)
                } else {
                    this._$activeButton = this.$leftButton;
                    this.$leftButton.css("zIndex", 20);
                    this.$rightButton.css("zIndex", 10)
                }
                this._mouseDownPageX = null
            }
            var newLeft = pageX - this._minusLeft;
            if (this._$activeButton[0] == this.$leftButton[0]) {
                if (newLeft > this.$rightButton.position().left) {
                    newLeft = this.$rightButton.position().left
                }
            } else {
                if (newLeft < this.$leftButton.position().left) {
                    newLeft = this.$leftButton.position().left
                }
            }
            var validBarLeft = this.$validbar.position().left + this.$fullbar.position().left;
            var validBarWidth = this.$validbar.width();
            newLeft = newLeft - this.$fullbar.position().left + this._buttonWidth / 2;
            newLeft = this._getFixedPosition(newLeft).leftX;
            newLeft = newLeft + this.$fullbar.position().left - this._buttonWidth / 2;
            if (this._$activeButton[0] == this.$leftButton[0] && this.$rightButton.position().left > this._fullbarWidth - 15 && newLeft > this._fullbarWidth - 15) {
                return
            }
            this._$activeButton.css("left", newLeft);
            this._setLowHightTip();
            this._setSelectedbar();
            this._setTipContent();
            this._setTipPosition()
        }
    },
    _fireChangeEvent: function() {
        if (this._lastValue == null || this._lastValue.leftValue != this._moveValue.leftValue || this._lastValue.rightValue != this._moveValue.rightValue) {
            var args = {
                "value": this._moveValue
            };
            this.$elem.trigger('changed', args)
        }
        this._lastValue = this._moveValue
    },
    _mouseupHandler: function() {
        if (this._allowDrag) {
            this._allowDrag = false;
            this._$activeButton = null;
            this._fireChangeEvent()
        }
    },
    setValue: function(option) {
        var pointX = this._getPointX(option);
        this.$leftButton.css("left", pointX.leftX + this.$fullbar.position().left - this._buttonWidth / 2);
        this.$rightButton.css("left", pointX.rightX + this.$fullbar.position().left - this._buttonWidth / 2);
        this._setSelectedbar();
        this._setTipContent();
        this._setTipPosition();
        if (!(option.triggerEvent === false)) this._fireChangeEvent();
        this._lastValue = this._moveValue;
        this._setLowHightTip()
    },
    setRange: function(option) {
        var pointX = this._getPointX(option);
        this.$validbar.css({
            left: pointX.leftX,
            width: pointX.rightX - pointX.leftX
        });
        this.$leftButton.css("left", pointX.leftX + this.$fullbar.position().left - this._buttonWidth / 2);
        this.$rightButton.css("left", pointX.rightX + this.$fullbar.position().left - this._buttonWidth / 2);
        this._setSelectedbar();
        this._setTipContent();
        this._setTipPosition();
        this._lastValue = this._moveValue;
        this._rangeValue = this._lastValue;
        this._setLowHightTip()
    },
    _getPointX: function(option) {
        var miniScale = this._getMiniScale();
        var leftX = null;
        var rightX = null;
        for (var i = miniScale.length - 1; i >= 0; i--) {
            if (option.leftValue >= miniScale[i].leftValue) {
                leftX = miniScale[i].leftX;
                this._tempValue.push([miniScale[i].leftValue, option.leftValue]);
                break
            }
        }
        for (var i = miniScale.length - 1; i >= 0; i--) {
            var rawScaleLeftValue = miniScale[i].leftValue;
            var scaleLeftValue = this._getValueByTempValue(rawScaleLeftValue);
            if (option.rightValue >= scaleLeftValue) {
                if (miniScale[i + 1] && option.rightValue > scaleLeftValue) {
                    rightX = miniScale[i + 1].leftX;
                    this._tempValue.push([miniScale[i + 1].leftValue, option.rightValue])
                } else {
                    rightX = miniScale[i].leftX;
                    this._tempValue.push([rawScaleLeftValue, option.rightValue])
                }
                break
            }
        }
        if (option.rightValue == option.leftValue) {
            leftX = rightX
        }
        return {
            leftX: leftX,
            rightX: rightX
        }
    },
    _getFixedPosition: function(leftX) {
        if (leftX < 0) leftX = 0;
        var miniScale = this._getMiniScale();
        if (leftX >= miniScale[miniScale.length - 1].leftX2 - 1) {
            return {
                leftX: this._fullbarWidth,
                leftValue: miniScale[miniScale.length - 1].leftValue
            }
        } else if (leftX >= miniScale[miniScale.length - 2].leftX) {
            return {
                leftX: miniScale[miniScale.length - 2].leftX,
                leftValue: miniScale[miniScale.length - 2].leftValue
            }
        }
        for (var i = miniScale.length - 2; i >= 0; i--) {
            if (leftX >= miniScale[i].leftX2 - 1) {
                return {
                    leftX: miniScale[i].leftX,
                    leftValue: miniScale[i].leftValue
                }
            }
        }
    },
    _getMiniScale: function() {
        var miniScale = [];
        var commonSingleWidth = (this._fullbarWidth - this.options.firstWidth - this.options.lastWidth) / (this._scale.length - 3);
        for (var i = 0; i < this._scale.length - 1; i++) {
            var singleWidth = commonSingleWidth;
            var scale = this._scale[i];
            var leftX = null;
            if (i == 0) {
                singleWidth = this.options.firstWidth
            } else if (i == this._scale.length - 2) {
                singleWidth = this.options.lastWidth
            }
            if (i == 0) {
                leftX = 0
            } else {
                leftX = this.options.firstWidth + (i - 1) * commonSingleWidth
            }
            if (i < this._scale.length - 2) {
                for (var j = 0; j < scale.value.length; j++) {
                    var s = {
                        leftX: leftX + j * singleWidth / scale.value.length,
                        leftValue: scale.leftValue[j]
                    };
                    if (j == 0) {
                        s.isBigPoint = true
                    }
                    miniScale.push(s)
                }
            } else {
                miniScale.push({
                    leftX: leftX,
                    leftValue: scale.key,
                    isBigPoint: true
                });
                miniScale.push({
                    leftX: this._fullbarWidth,
                    leftX2: leftX + singleWidth * scale.value,
                    leftValue: this._scale[i + 1].key,
                    isBigPoint: true
                })
            }
        }
        for (var i = miniScale.length - 2; i >= 0; i--) {
            var mScale = miniScale[i];
            if (i == 0) {
                mScale.leftX2 = 0;
                break
            }
            if (mScale.isBigPoint) {
                mScale.leftX2 = mScale.leftX - (mScale.leftX - miniScale[i - 1].leftX) * 0.6
            } else if (miniScale[i - 1].isBigPoint) {
                mScale.leftX2 = mScale.leftX - (mScale.leftX - miniScale[i - 1].leftX) * 0.4
            } else {
                mScale.leftX2 = mScale.leftX - (mScale.leftX - miniScale[i - 1].leftX) * 0.5
            }
        }
        return miniScale
    },
    _getValueByTempValue: function(value) {
        if (this._tempValue == null) return value;
        for (i = 0; i < this._tempValue.length; i++) {
            if (this._tempValue[i][0] == value) {
                return this._tempValue[i][1]
            }
        }
        return value
    },
    _getPointLeft: function(buttonLeft) {
        return Math.abs(buttonLeft + this._buttonWidth / 2 - this.$fullbar.position().left)
    },
    getValue: function() {
        var leftX = this._getPointLeft(this.$leftButton.position().left);
        var leftPosition = this._getFixedPosition(leftX);
        var leftValue = this._getValueByTempValue(leftPosition.leftValue);
        var rightX = this._getPointLeft(this.$rightButton.position().left);
        var rightPosition = this._getFixedPosition(rightX);
        var rightValue = this._getValueByTempValue(rightPosition.leftValue);
        var leftValidX = this.$validbar.position().left;
        var rightValidX = leftValidX + this.$validbar.width();
        return {
            leftValue: leftValue,
            rightValue: rightValue,
            leftX: leftX,
            rightX: rightX,
            leftValidX: leftValidX,
            rightValidX: rightValidX
        }
    },
    _setSelectedbar: function() {
        this.$selectedbar.css({
            left: this.$leftButton.position().left + this.$leftButton.width() / 2,
            width: this.$rightButton.position().left - this.$leftButton.position().left
        })
    },
    _setTipPosition: function() {
        var leftButtonLeft = this.$leftButton.position().left;
        var rightButtonLeft = this.$rightButton.position().left;
        var tipWidth = this.$tip.outerWidth();
        this.$tip.css("left", leftButtonLeft + (rightButtonLeft - leftButtonLeft) / 2 - tipWidth / 2 + this._buttonWidth / 2)
    },
    _setTipContent: function() {
        var value = this.getValue();
        var content = "";
        var min = null;
        var max = null;

        if ( this.noValidbar == false && Math.abs(value.rightX - value.rightValidX) <= 2 && Math.abs(value.leftX - value.leftValidX) <= 2) {
            content = "unlimited"
        } else if (this._beyondMax == true && value.rightValue == this._getValueByTempValue(this._max) && this._beyondMin == true && value.leftValue == this._getValueByTempValue(this._min)) {
            content = "unlimited"
        } else if (value.leftValue == this._getValueByTempValue(this._min) && value.rightValue == this._getValueByTempValue(this._max)) {
            content = value.leftValue + "-" + this._scale[this._scale.length - 2].key + this._unit + " above"
        } else if (this._beyondMax == true && value.rightValue == this._getValueByTempValue(this._max)) {
            if (value.leftValue == value.rightValue) {
                content = this._scale[this._scale.length - 2].key + this._unit + " above"
            } else {
                content = value.leftValue + this._unit + " above"
            }
        } else if (this._beyondMin == true && value.leftValue == this._getValueByTempValue(this._min)) {
            content = value.rightValue + this._unit + " below"
        } else if (value.leftValue == value.rightValue) {
            content = value.leftValue + this._unit
        } else {
            content = value.leftValue + "-" + value.rightValue + this._unit
        }
        db.ref('/price/').push({"price_min":value.leftValue});
        db.ref('/price/').push({"price_max":value.rightValue});
        this.$tipContent.html(content);
        this._moveValue = value
    }
}
})();
//slider end

// function get_three_data(){
//     var all_data = new Array(4);
//     db.ref('/category/').on('value', function(snapshot){
//         if(snapshot.val()!= null){    
//             var keys = Object.keys(snapshot.val());
//             var recent = keys[keys.length - 1];
//             var category = snapshot.val()[recent];
//             category = category.category;
//             all_data.push(category);
//         }
//     })
    
//     db.ref('/location/').on('value', function(snapshot){
//         if(snapshot.val()!= null){    
//             var keys = Object.keys(snapshot.val());
//             var recent = keys[keys.length - 1];
//             var location = snapshot.val()[recent];
//             location = location.location;
//             all_data.push(location);
//         }
//     })

//     db.ref('/price/').on('value', function(snapshot){
//         if(snapshot.val()!= null){    
//             var keys = Object.keys(snapshot.val());
//             var max = keys[keys.length - 1];
//             var min = keys[keys.length - 2];
//             var price_max = snapshot.val()[max];
//             price_max = price_max.price_max;
//             var price_min = snapshot.val()[min];
//             price_min = price_min.price_min;
//             all_data.push(price_min);
//             all_data.push(price_max);
//         }
//     })
//     //console.log(all_data);
//     // var category = all_data[0];
//      console.log(all_data);
//     // var location = all_data[1];
//     // var price_min = all_data[2];
//     // var price_max = all_data[3];
//     return all_data;
// }