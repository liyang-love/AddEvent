import * as React from "react" ;
import {Switch} from "react-router";
import {Route ,MemoryRouter,BrowserRouter} from "react-router-dom";
import SlideMenu from "@js/containers/SlideMenu";
import Head from "@js/containers/Head";
import MainRouter from "@js/Router" ;


BrowserRouter

type indexProps = {
}

type indexState={

}
class IndexCom extends React.PureComponent<indexProps,indexState>{
	
	render(){
			return  (
								<>
												<SlideMenu/>
											  <div className="g-content">
													 <Head/>
													<div className="g-main">
																<Switch>
																	<MainRouter  />
																</Switch>
													</div>
											 </div>
									</>				
								) 
		
	}
}



type appProps = {

}

type appState={

}
class App extends React.PureComponent<appProps ,appState>{
	

	render(){
			return (
					<MemoryRouter>
							<Switch>
									 	<Route  path="/"   component={IndexCom} />		
							</Switch>
					</MemoryRouter>
					)
		}
	
}




export	default App ; 