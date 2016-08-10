import { Router } from "../app-router";

Router.register({
	maileditor: ["/maileditor", "mailEditor"]
}, "appLogged", Router.groups.editor);
