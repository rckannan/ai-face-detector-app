const _account : string = "sgfacedetector01"; 
const _containerName : string = "facedetectorcontainer"; 
const _accountKey : string = "?sv=2022-11-02&ss=b&srt=sco&sp=rwdlacyx&se=2024-12-31T15:19:10Z&st=2024-01-27T07:19:10Z&spr=https&sig=cYIGpco4gl89kGF8a37SzvhD9ckWjFrKhrg0a2DjLck%3D";
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
