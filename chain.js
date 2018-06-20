window.wordsArrs = [{ username: "", words: '致天下有情人：链上的誓言，海枯石烂，天荒地老，永生不变！' }];
var spcUrl = "https://dapi.sparkchain.cn";

//var chainCode = "moacTest"
//var tokenCode = "MOAC" //MOAC
// var moacTestSrcAddr = "0x58bfc0c19b60343cc00a52c2f7bd2e4108ee7a02";
// var moacTestSrcSecret = "71a31f2e8ea013fe230e9c37059c7fbc0569a45b278602990997ee032e0f4d6c";
// var moacTestDestAddr = "0x2f273309e60c84faae14e74e02364a6673276506";
// var moacTestDestSecret = "7e9473d3a81b4d8d52a7a1039589e51042773e06989c21d22f32d1b571ac215a";

// var chainCode = "jingtumTest"
// var tokenCode = "SWT" //MOAC

// var moacTestSrcAddr = "jE4uC8MJwxfvDbEswL17oTfP85tiNCmTMC";
// var moacTestSrcSecret = "sn3rahjyJ8Y1oemTCBWG1ftSwHWQy";
// var moacTestDestAddr = "j9G3DeMh1AbW2Tpup1Rhpx7nkgEuPWjcna";
// var moacTestDestSecret = "sp5afqfvtdwQ5MjcE3ZbeLtrvKsLi";

//1:初始化应用
//http://dapi.sparkchain.cn/v1/app/init/?appcode=moacDappMineScann&appname=moac扫雷

//2:先通过postman调用http://dapi.sparkchain.cn/v1/account/creatAccount/?chainCode=moacTest创建两个账户

var appId = "1006694357115338752";
var appsecret = "01a68a2b-191d-48ad-93bc-28b2745c71f0"
var accessToken = null;

//http://explorer.moac.io/tx/0xf4e21e6eb7569bb42d559825579ba2c0c79c35927e3180571185508642828ae5
var chainCode = "moac"
var tokenCode = "MOAC"
var moacTestSrcAddr = "0x32d012e43fdc978260cee98f5f6899a6cb18a148";
var moacTestSrcSecret = "dc641502929e384bc6434425d0d580a2c185a97d3d52bfe74a4c23faf8bc8024";
var moacTestDestAddr = "0x07b18a20c025674bd30edce6fe055d7d5a55f370";
var moacTestDestSecret = "94dfec2d2bdb3cde1a70700b123a3030b369a57a8d4d041ceb2625784263afb3";


window.wordslist = function (cb) {
  var url = spcUrl + "/v1/account/transInfoList";
  var data = {
    "account": moacTestSrcAddr,
    "pagesize": 100,
  };
  $.post(url, data, function (res) {
    console.log(res.data)
    // var data = JSON.parse(res.data);
    var data = res.data;
    if (res.success && !!data.results) {
      for (var i = 0; i < data.results.length; i++) {
        var memos = data.results[i]["memos"];
        if (!memos) continue;
        var memosJson = eval('(' + memos + ')');// JSON.parse(memos);

        var words = memosJson["words"];
        if (!words) continue;
        var username = memosJson["username"];
        // alert(words);
        // window.wordsArrs = window.wordsArrs || [];
        window.wordsArrs.push({
          "username": username,
          "words": words
        });

      }
      cb();

    }

  })
}

//wordslist  wordsArrs   upchain

// 3:上链 调用  http://dapi.sparkchain.cn/v1/account/transfer进行文本上链
window.upchain = function (username, words) {
  var url = spcUrl + "/v1" + "/account/transfer";
  var data = {
    "srcAccount": moacTestSrcAddr,
    "privateKey": moacTestSrcSecret,
    "destAccount": moacTestDestAddr,
    "amount": 0,
    "chainCode": chainCode,
    "tokenCode": tokenCode,
    "bizId": Math.floor(Math.random() * 100000000) + "",
    "memo": "{ \"username\" :\"" + username + "\",\"words\":\"" + words + "\"}"
  };

  $.post(url, data, function (res) {
    console.log(res)
    // var data = JSON.parse(res.data);
    var data = res.data;
    if (res.success) {
      alert("您的誓言已经永久保存在公链，来生永世，海枯石烂，天荒地老，您的誓言都将永存！");
    }
  });


}

