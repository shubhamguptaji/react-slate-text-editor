import React, { Component, Fragment } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import Icon from "react-icons-kit";
import { bold } from "react-icons-kit/feather/bold";
import { italic } from "react-icons-kit/feather/italic";
import { code } from "react-icons-kit/feather/code";
import { underline } from "react-icons-kit/feather/underline";
import { list } from "react-icons-kit/feather/list";
import { FormatToolbar, BoldMark, ItalicMark } from "./index";
const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "hello world!"
              }
            ]
          }
        ]
      }
    ]
  }
});

export default class TextEditor extends Component {
  state = {
    value: initialValue
  };
  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (e, change) => {
    if (!e.ctrlKey) return;
    e.preventDefault();

    switch (e.key) {
      case "b": {
        change.toggleMark("bold");
        return true;
      }
      case "i": {
        change.toggleMark("italic");
        return true;
      }
      case "c": {
        change.toggleMark("code");
        return true;
      }
      case "u": {
        change.toggleMark("underline");
        return true;
      }
      case "l": {
        change.toggleMark("list");
        return true;
      }
      default: {
        return true;
      }
    }
  };

  renderMark = props => {
    switch (props.mark.type) {
      case "bold":
        return <BoldMark {...props} />;
      case "italic":
        return <ItalicMark {...props} />;
      case "code": {
        return <code {...props.attributes}>{props.children}</code>;
      }
      case "list": {
        return (
          <ul {...props.attributes}>
            <li>{props.children}</li>
          </ul>
        );
      }
      case "underline": {
        return <u {...props.attributes}>{props.children}</u>;
      }
      default:
        return;
    }
  };

  onMarkClick = (e, type) => {
    e.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  };

  render() {
    return (
      <Fragment>
        <FormatToolbar>
          <button
            onPointerDown={e => this.onMarkClick(e, "bold")}
            className="tooltip-icon-button"
          >
            <Icon icon={bold} />
          </button>
          <button
            onPointerDown={e => this.onMarkClick(e, "italic")}
            className="tooltip-icon-button"
          >
            <Icon icon={italic} />
          </button>
          <button
            onPointerDown={e => this.onMarkClick(e, "code")}
            className="tooltip-icon-button"
          >
            <Icon icon={code} />
          </button>
          <button
            onPointerDown={e => this.onMarkClick(e, "underline")}
            className="tooltip-icon-button"
          >
            <Icon icon={underline} />
          </button>
          <button
            onPointerDown={e => this.onMarkClick(e, "list")}
            className="tooltip-icon-button"
          >
            <Icon icon={list} />
          </button>
        </FormatToolbar>
        <Editor
          value={this.state.value}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
          onChange={this.onChange}
        />
      </Fragment>
    );
  }
}
