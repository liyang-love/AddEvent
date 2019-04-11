import "css/common/menu.scss";

/*渲染菜单*/

class Menu{

	constructor(data,$box){
		this.init(data,$box);
		this.handle($box);
	}

	init(data,$box){
	
		
	  const str = data.map(val=>{

	  		const {children} = val ;
	  		
	  		if(children && children.length){

	  				const childArr = children.map(node=>this.childComponent(node)).join("");

	  				return this.parentComponent(childArr,val);
	  				
	  		}else{

	  			return this.childComponent(val);
	  		}

	  });
		$box.html(str.join(""));
	}
	
	mapMenuJson(arr,_lev){

		let lev = _lev;
		lev++;
		return arr.map((val,index)=>{
			
			const {children,name,id,par_id,url,des} = val;

			let data = {
				url,
				par_id,
				id,
				lev,
				icon:des
			}

			if(par_id == -2){

 
				let  childrenEl = this.mapMenuJson(children,lev);

				return this.parentComponent(childrenEl,name,data);

			}else{

				const item = this.childComponent(name,data);
			
				return 	item;					
			
			}
		})

	}

	parentComponent(child,data){

		let {url,id,text,icon="fa-circle"}= data;

		return (`
							<li class="li-par" >
									<div  class="menu-item menu-par" data-url="${url}">
											<span class="par-icon">
												<i class="fa ${icon}"></i>
											</span>	
											<span class="j-nav" data-id="${id}">${text}</span>
											<span class="j-slide_menu">
												<i class="fa fa-chevron-down"></i>
											</span>
									</div>	
									<ul class="child-ul">
										${child}
									</ul>
							</li>
		`);

	}

	childComponent(data){
		let {url,id,text}= data;
		return (`
						<li class="li-child" >
								<div  class="menu-item menu-child" data-url="${url}">
										<span class="j-nav" data-id="${id}"> ${text} </span>
								</div>	
						</li>
		`);		
	}

	getIframeUrl(){
		
		if(!window.jsp_config.resourse){
			return function(url){

					return url.split("/")[2]+".html";
			}
		
		}else{
			return function(url){
				return url;
			};
		}
	}

	handle($box){

		const _self = this ;

		const getUrlMethod = this.getIframeUrl();

		/*收缩目录*/
		$box.on("click",".j-slide_menu",function(e){
			e.stopPropagation();
			const $this = $(this);
			const $icon = $this.children(".fa");
			const $childEl = $this.parent().siblings(".child-ul");
			const is_down = $icon.hasClass("fa-chevron-down");

			if(is_down){
				$icon.removeClass("fa-chevron-down").addClass("fa-chevron-up");
				$childEl.slideUp();
			}else{

				$icon.removeClass("fa-chevron-up").addClass("fa-chevron-down");
				$childEl.slideDown();
			}
		});

		/*切换菜单*/
		$box.on("click",".menu-item",function(events){

			const $this = $(this);
			$("#menu .active").removeClass("active");
			$this.addClass("active");

			if($this.hasClass("menu-par")){
				return;
			};

			$this.closest(".child-ul").siblings(".menu-par").addClass("active");

			const url= $this.attr("data-url");
			const iframeUrl = getUrlMethod(url);
				$("#routerConter").html(`<iframe frameborder="0" id="router" name="myFrameName" src="${iframeUrl}"></iframe>`);
			

		});
	}
}

export {Menu} ;