import React from "react";

interface MessageProps {
    title: string;
    textInputTitle: string;
    keyInputTitle: string;
    executeButtonTitle: string;
    outputTitle: string;
    outputValue: string;
    transmit: (content: string, key: string) => void;
}
  
type MessageState = {
    content: string;
    key: string;
}

export class Message extends React.Component<MessageProps, MessageState> {

    constructor(props: MessageProps) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.state = {content: "", key: ""};
    }

    private onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value !== undefined) {
            if (event.target.name === "content") {
                this.setState({
                    content: event.target.value
                 });
            } else if (event.target.name === "key") {
                this.setState({
                    key: event.target.value
                 });
            }
        }
    }

    public render() {
        return (
            <div>
                <div>
                    <p>{this.props.title}</p>
                </div>
                <div>
                    <div>
                        <label htmlFor="new-message-title">
                            {this.props.textInputTitle}
                        </label>
                    </div>
                    <div>
                        <input id="new-message-title-input" name="content" type="text" defaultValue={""} onChange={this.onInputChange}/>  
                    </div>
                    <label htmlFor="new-message-keypass-title">
                        {this.props.keyInputTitle}
                    </label>
                    <div>
                        <input id="new-message-keypass-input" name="key" type="text" defaultValue={""} onChange={this.onInputChange}/>  
                    </div>
                    <div>
                        <button onClick={() => {
                            this.props.transmit(this.state.content, this.state.key)}}>
                            {this.props.executeButtonTitle}
                        </button>
                    </div>
                    <div>
                        <label>
                            {this.props.outputTitle}
                        </label>
                        <label>
                            {this.props.outputValue}
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}