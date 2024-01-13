
const _account : string = "rithstgaccai001"; 
const _containerName : string = "face-detector-container"; 
const _accountKey : string = "?sv=2022-11-02&ss=b&srt=sco&sp=rwdlaciyx&se=2024-01-31T01:36:25Z&st=2024-01-09T17:36:25Z&spr=https&sig=9kSdE199BLLfWgnJgm4QtQK9hoVnZdSosfUaKnk3kfE%3D";
const _eventID : string = "1";

export abstract  class azConnectDetails { 
    public static accountName() : string{
        return _account;
    }

    public static containerName(): string{
        return _containerName;
    }

    public static accountKey(): string{
        return _accountKey;
    }

    public static azURL(): string{
        return `https://${_account}.blob.core.windows.net/${_accountKey}`;
    }

    public static eventID(): string{
        return _eventID;
    }
}   