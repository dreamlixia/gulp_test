(function(){

	if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }
	//2020/01/10 LIXIA因上线后跳转地址带了预发url，去掉试试
	// var baseUrl= window.location.origin + '/pre-release-02';
	var baseUrl= window.location.origin;
	var H5BaseUrl="//es-static.xiaojukeji.com/static/web/third-lib/platform/";
  var passortUrls = [
    '//passport.qatest.didichuxing.com', // 测试环境
    '//epassport.diditaxi.com.cn' // 国内线上环境
  ];
  var env = 1
	baseConfig={
    env: env,
    codeUrl: passortUrls[env] + '/passport/login/v5/codeMT',
		registerCodeUrl : baseUrl+"/openauth/Platform/sendRegistCode",
		loginCodeUrl : baseUrl+"/openauth/Platform/sendLoginCode",
		authCodeUrl : baseUrl+"/openauth/Platform/sendCancelAuthCode",
		registerUrl : baseUrl+"/openauth/Platform/regist",
		loginUrl : baseUrl+"/openauth/Platform/login",
		authUrl : baseUrl+"/openauth/Platform/auth",
		cancleAuthUrl : baseUrl+"/openauth/Platform/cancelAuth",
		retryAuthUrl : baseUrl+"/openauth/Platform/reAuth",

		indexPage : baseUrl+"/openauth/Platform/index",
		registerPage :baseUrl+"/openauth/Platform/showRegist",
		loginPage : baseUrl+"/openauth/Platform/showLogin",
		authPage : baseUrl +"/openauth/Platform/showAuth",
		authCheckPage : baseUrl +"/openauth/Platform/showAuthCheck",
		authAgreePage : H5BaseUrl +"authAgree.html",
		tripsAgreePage : H5BaseUrl +"tripsAgree.html"
	};

	requirejs.config({
    	baseUrl: H5BaseUrl+"js",
	    paths:{
	    	"jquery":"libs/jquery-1.12.3.min",
	    	"zepto":"libs/zepto.min"
	    },
	    map:{
	        '*':{
	            'pages/basic':'pages/basic',
	            'pages/dialog':'pages/dialog',
	            'pages/h5':'pages/h5',
	            'pages/pc':'pages/pc'
	        }
	    }
	});

	if (/iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|android|iPod/i.test(navigator.userAgent.toLowerCase())) {
		require(["zepto","pages/basic"],function(){
			require(["pages/dialog","pages/h5"]);
		});
	}else{
		require(["jquery","pages/basic"],function(){
			require(["pages/pc"]);
		});
	}
})();
