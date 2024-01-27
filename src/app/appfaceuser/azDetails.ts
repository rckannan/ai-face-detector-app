
const _account : string = "sgfacedetector01"; 
const _containerName : string = "facedetectorcontainer"; 
const _accountKey : string = "?sv=2022-11-02&ss=b&srt=sco&sp=rwdlacyx&se=2024-03-31T14:16:09Z&st=2024-01-27T06:16:09Z&spr=https&sig=EHbsZ3%2FXTprgBcFB%2B7eQg7gbUI1PV%2FS1Hi8RuLEg82s%3D";
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
