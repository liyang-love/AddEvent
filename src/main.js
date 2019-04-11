import "css/main.scss";
import {api} from "api/main.js";
import {RippleBtn,Unit,SModal} from "js/common/Unit.js";
import {Menu} from "js/main/Menu.js";



const {role_id,baseUrl,base} = window.jsp_config;


class Page{


	constructor(){
		this.iframe = $("#router");
		this.unit = new Unit();
		this.modal = new SModal();
		this.handle();
		this.init();
		
	}

	init(){
		this.renderMenu();
	}

	renderMenu(){
		return api.getLeftMenu().then(data=>{

			if(data && data.length){
				new Menu(data,$("#menu"));

			}else{
				this.unit.tipToast("菜单为空",2);
			}
			
		});
	}

	handle(){

		const _self = this;

		const closeFun = (function (){
			let count  =  0 ;
		
			return function($this){
			  const $slide =$this.closest("#gSlideMenu ");

				count ++ ;
				if(count%2){
						$("#menu .child-ul").show();
					$slide.addClass("collapsed");
					$slide.animate({"width":50},400,function(){
						
					});
				}else{
					$(".fa-chevron-up").addClass("fa-chevron-down").removeClass("fa-chevron-up")
					$slide.animate({"width":250},400,function(){
						$slide.removeClass("collapsed");
					});
				}
			}
		})();

		/*收缩菜单*/
		$("#j-slideBar").click(function(){
			closeFun($(this));
		});
	

		/*系统操作*/
		$("#userOpt").on("click","li",function(){

			const key = $(this).attr("key");

			switch(key){
				
				case "power": //退出登录

					if(window.jsp_config.resourse){
						window.location.href=baseUrl+"login/logOut";
					}else{
						window.location.href="login.html";
					}
				
				break;
			}
		});
	}

}

const page = new Page();
