
const _account : string = "sgfacedetector01"; 
const _containerName : string = "facedetectorcontainer"; 
const _accountKey : string = "sp=racwdlme&st=2024-01-27T06:33:29Z&se=2024-04-01T14:33:29Z&spr=https&sv=2022-11-02&sr=c&sig=Io%2FD35hUuWP7Z7qG%2Buuxi1Ap6MCo8xPL1wLzyEvC5IM%3D";
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
