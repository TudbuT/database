**Better DB**
-------------

`> npm i bdb.js`



**What is it**

A very simple JSON DataBase loader, which autosaves your data every 5 seconds.



**How to use**

```
const bdb = require("bdb.js");
const db = bdb.load("data/config.json", 1); // file, autosave

if(!db.test)
    db.test = {};
```



**Docs**

```
BDB #exported :
    load (<file path>, [1 / true / 0 / false]) -> DataBase
DataBase:
    save () -> null
    autosave <- [1 / 0]
    path <- file path
    <everything else> <- your own values
```
