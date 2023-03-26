## RUNNING MIGRATIONS


* 💡 Remember 💡
* You must BUILD your Nest project (so that everything is output to the `/dist/` folder,
* before a Migration can run, it needs compilated files.


### Compile project first
npm run build

### Run migration(s)
npx typeorm migration:run -d dist/typeorm-cli.config.js

### REVERT migration(s)
npx typeorm migration:revert -d dist/typeorm-cli.config.js

### Let TypeOrm generate migrations (for you)
npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config