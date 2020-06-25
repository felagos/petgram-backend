import 'module-alias/register';

import moduleAlias from 'module-alias';

moduleAlias.addAlias("@routes", __dirname + "/routes");
moduleAlias.addAlias("@env", __dirname + "/environment");
moduleAlias.addAlias("@app", __dirname + "/app");
moduleAlias.addAlias("@mongo", __dirname + "/mongo");
moduleAlias.addAlias("@controllers", __dirname + "/controllers");
moduleAlias.addAlias("@services", __dirname + "/services");
moduleAlias.addAlias("@models", __dirname + "/models");
moduleAlias.addAlias("@enums", __dirname + "/enums");

moduleAlias('./package.json');
