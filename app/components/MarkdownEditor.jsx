import React from 'react';
import cx from 'classnames';
import Editor from 'rich-markdown-editor';
import MarkdownSerializer from 'slate-md-serializer';
import { getPalette } from '../themes/themeBuilder';
import { getCodeTheme, getEditorTheme } from './MarkdownEditorThemes';

const Markdown = new MarkdownSerializer();
class RTEditor extends React.PureComponent {
  editorRef = React.createRef();

  componentDidUpdate(prevProps) {
    const { value, readOnly } = this.props;
    if (value !== prevProps.value && readOnly) {
      this.editorRef.current.setState({
        editorValue: Markdown.deserialize(value),
      });
    }
  }

  handleChange = (value) => {
    const { onChange, changeTitle, card } = this.props;
    const rawValue = value();
    if (onChange && rawValue) {
      const { title, text } = card;
      const rawValueTitle = rawValue && rawValue.match(new RegExp(/^(.*)$/m))[0];
      const handledValue = rawValue && rawValue.replace(rawValueTitle, '');
      const handledTitle = rawValueTitle && rawValueTitle.replace('# ', '');
      if (handledTitle && handledTitle !== title) {
        changeTitle(handledTitle);
      }
      if (handledValue && handledValue !== text) {
        onChange(handledValue);
      }
    }
  };

  render() {
    const {
      value,
      readOnly,
      onSave,
      className,
      card,
      codeTheme = 'DRA',
      whiteMode,
    } = this.props;
    const palette = getPalette(whiteMode);
    const editorTheme = getEditorTheme(palette);
    return (
      <Editor
        ref={this.editorRef}
        className={cx(className, 'mdyna-md', 'card-content')}
        readOnly={readOnly}
        autoFocus={!readOnly}
        defaultValue={value}
        onSave={() => onSave(card)}
        onChange={val => this.handleChange(val)}
        onSearchLink={async (term) => {
          console.log('Searched link: ', term);
          return [
            {
              title: term,
              url: 'localhost',
            },
          ];
        }}
        theme={{
          ...editorTheme,
          ...getCodeTheme(codeTheme),
        }}
      />
    );
  }
}

export default RTEditor;
