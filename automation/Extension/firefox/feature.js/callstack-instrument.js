
export class CallstackInstrument {
    constructor(dataReceiver) {
        this.dataReceiver = dataReceiver;
    }
    run(crawlID) {
        browser.stackDump.onStackAvailable.addListener((requestId, stack, seed) => {
            const record = {
                crawl_id: crawlID,
                request_id: requestId,
                call_stack: stack
            };
            this.dataReceiver.logWarn(JSON.stringify({ message:"This message is from Child" + seed, data:record}));
            this.dataReceiver.saveRecord("callstacks", record);
        });
    }
}