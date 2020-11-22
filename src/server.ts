import "./alias";

import App from '@app';
import { environment } from '@env';

console.log("env", environment);

App.listen(environment.PORT, () => {
    console.log(`Server up ${environment.PORT} !`);
});
