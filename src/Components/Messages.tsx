import React from "react";
import { NetworkingService, EncryptedMessageData, DecryptedMessageData } from "../Services/NetworkingService";
import { Message } from "./Message";

interface MessagesProps {
    networking: NetworkingService
}

type MessagesState = {
    encryptedMessageOutput: string;
    decryptedMessageOutput: string;
}

export class Messages extends React.Component<MessagesProps, MessagesState> {

    private networking: NetworkingService;

    constructor(props: MessagesProps) {
        super(props);
        this.encrypt = this.encrypt.bind(this);
        this.decrypt = this.decrypt.bind(this);
        this.networking = this.props.networking;
        this.state = {
            encryptedMessageOutput: "",
            decryptedMessageOutput: "",
        };
    }

    private async encrypt(content: string, key: string) {
        const encryptedMessageData: EncryptedMessageData = {
            text: content,
            password: key
        }
        try {
            const encryptedMessageresponse = await this.networking.postMessgae(encryptedMessageData);
            this.setState({encryptedMessageOutput: encryptedMessageresponse.message});
        } catch (error) {
            alert(error);
        }
    }

    private async decrypt(content: string, key: string) {

        const decryptedMessageData: DecryptedMessageData = {
            hash: content, 
            password: key
        }

        try {
            const decryptedMessageResponse = await this.networking.getMessage(decryptedMessageData);
            this.setState({decryptedMessageOutput: decryptedMessageResponse.message});
        } catch (error) {
            alert(error);
        }
    }
    
    public render() {
        return (
            <div className="messages">
            <Message title="Encrypt" 
                textInputTitle="message:" 
                keyInputTitle="keypass:" 
                executeButtonTitle="Encrypt!" 
                outputTitle="output: " 
                outputValue={this.state.encryptedMessageOutput}
                transmit={this.encrypt}/>
            <Message title="Decrypt" 
                textInputTitle="hash:" 
                keyInputTitle="keypass:" 
                executeButtonTitle="Decrypt!" 
                outputTitle="output: " 
                outputValue={this.state.decryptedMessageOutput}
                transmit={this.decrypt}/>
            </div>
        );
    }
}