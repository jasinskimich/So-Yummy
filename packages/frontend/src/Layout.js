import { Outlet } from "react-router-dom";
// import { Header } from "./components/Header/Header";
import { Suspense } from "react";


function Layout() {
	// const [loggedName] = useState("")

	return (
		<div>
			{/* <Header name={loggedName}/> */}
			{/* <Navigation /> */}
			{/* <Currency/> */}
			<Suspense fallback={null}>
				<Outlet />
			</Suspense>
		</div>
	);
}

export default Layout;
