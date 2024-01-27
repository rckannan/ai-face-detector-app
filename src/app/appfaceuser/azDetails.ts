
const _account : string = "sgfacedetector01"; 
const _containerName : string = "facedetectorcontainer"; 
const _accountKey : string = "?sv=2022-11-02&ss=b&srt=sco&sp=rwdlacyx&se=2024-12-31T14:57:27Z&st=2024-01-27T06:57:27Z&spr=https&sig=%2FpNOl9iY%2F8Jhx4P9Ryf3h6eLh4A7OIkGqK1sl8NbngY%3D";
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
