import AppAppBar from "./modules/views/AppAppBar";
import AppFooter from "./modules/views/AppFooter";
import withRoot from "./modules/withRoot";


function MainView() {
    return(
        <>
            <AppAppBar />
            <AppFooter />
        </>
    );
}

export default withRoot(MainView);