import * as duckdb from "@duckdb/duckdb-wasm";

const ENABLE_DUCK_LOGGING = false;

const SilentLogger = {
    log: () => {
        /* do nothing */
    },
};

let duckConn;
let initialize;

export async function getDuckConn() {
    if (duckConn) {
        return duckConn;
    } else if (initialize) {
        // The initialization has already been started, wait for it to finish
        return initialize;
    }

    let resolve;
    let reject;
    initialize = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });

    try {
        const allBundles = duckdb.getJsDelivrBundles();
        const bestBundle = await duckdb.selectBundle(allBundles);
        if (bestBundle.mainWorker) {
            const worker = await duckdb.createWorker(bestBundle.mainWorker);
            const logger = ENABLE_DUCK_LOGGING
                ? new duckdb.ConsoleLogger()
                : SilentLogger;
            const db = new duckdb.AsyncDuckDB(logger, worker);
            await db.instantiate(
                bestBundle.mainModule,
                bestBundle.pthreadWorker
            );
            // await db.open({
            //     path: ":memory:",
            //     query: {
            //         castBigIntToDouble: true,
            //     },
            // });
            const conn = await db.connect();

            duckConn = { db, conn, worker };
            resolve(duckConn);
        } else {
            throw new Error("No best bundle found for DuckDB worker");
        }
    } catch (err) {
        reject(err);
        throw err;
    }

    return duckConn;
}

// // Closing everything
// await conn.close();
// await db.terminate();
// await worker.terminate();
