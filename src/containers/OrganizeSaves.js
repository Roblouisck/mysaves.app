import React from 'react';
import { connect } from 'react-redux';
import { storeSaveValuesWithHTML, storeSaveValuesChronologically } from '../actions/index'

class OrganizeSaves extends React.Component {
  decodeHtml(html) {
    return (
      html
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/#/g, '')
      .replace(/&amp;/g, '')
      .replace(/x200B;/g, '')
      )
  }

  componentDidUpdate() {
    const importantValues = this.props.totalUserSaves.map((save) => {
      return { 
        subreddit: String(`r/${save.data.subreddit}`), 
        title: this.decodeHtml(String(save.data.title)), 
        key: save.data.id, 
        link: String(`https://www.reddit.com${save.data.permalink}`),
        type: String(save.kind),
        body: this.decodeHtml(String(save.data.body))
      }
    })

    const valuesMappedToHTML = importantValues.map( save => {
      return { 
        subreddit: save.subreddit, 
        title: save.title, 
        key: save.key, 
        link: save.link,
        type: save.type,
        body: save.body,

        displaySubreddit_t: 
          <div className="subreddit_t"> 
            {save.subreddit}: 
          </div>, 

        displaySubreddit_c: 
          <div className="subreddit_c"> 
            {save.subreddit}: 
          </div>, 

        displayTitle: 
          <div className="title-grid-container">
            <div className="title-grid">
              <p className="thread"> 
                <a href={save.link} target="_blank" rel="noopener noreferrer"> {save.title} </a> 
              </p>
            </div>
          </div>, 

        displayTitle_ThreadOnly:
          <p className="threadOnly"> 
            <a className="titleOnly" href={save.link} target="_blank" rel="noopener noreferrer"> {save.title} </a> 
          </p>,

        displayBody: 
          <pre className="comment">
            {save.body}
          </pre>,

        displayCommentSource: 
          <p className="comment"> 
            <a href={save.link} target="_blank" rel="noopener noreferrer"> src </a> 
          </p>,

        displayComment:
          <div className="comments-grid-container">
            <div className="comments-grid">
              <pre className="comment">{save.body}</pre>
              <p className="comment"> <a href={save.link} target="_blank" rel="noopener noreferrer"> src </a> </p>
            </div>
        </div>
      }
    })

    this.props.storeSaveValuesChronologically(valuesMappedToHTML)

    const importantValuesSorted = importantValues.sort((a, b) => {
      let nameA = a.subreddit.toUpperCase();
      let nameB = b.subreddit.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
        return 0;
      });

    const valuesMappedToHTMLSorted = importantValuesSorted.map( save => {
      return { 
        subreddit: save.subreddit, 
        title: save.title, 
        key: save.key, 
        link: save.link,
        type: save.type,
        body: save.body,

        displaySubreddit_t: 
          <div className="subreddit_t"> 
            {save.subreddit}: 
          </div>, 

        displaySubreddit_c: 
          <div className="subreddit_c"> 
            {save.subreddit}: 
          </div>, 

        displayTitle: 
          <div className="comments-grid-container">
            <div className="comments-grid">
              <p className="thread"> 
                <a href={save.link} target="_blank" rel="noopener noreferrer"> {save.title} </a> 
              </p>
            </div>
          </div>, 

        displayTitle_ThreadOnly:
          <p className="threadOnly"> 
            <a className="titleOnly" href={save.link} target="_blank" rel="noopener noreferrer"> {save.title} </a> 
          </p>,

        displayBody: 
          <pre className="comment">
            {save.body}
          </pre>,

        displayCommentSource: 
          <p className="comment"> 
            <a href={save.link} target="_blank" rel="noopener noreferrer"> src </a> 
          </p>,

        displayComment:
          <div className="comments-grid-container">
            <div className="comments-grid">
              <pre className="comment">{save.body}</pre>
              <p className="comment"> <a href={save.link} target="_blank" rel="noopener noreferrer"> src </a> </p>
            </div>
        </div>
      }
    })


    this.props.storeSaveValuesWithHTML(valuesMappedToHTMLSorted)
  }


  render () {
    return null
  }
}

const mapStateToProps = state => {
  return { 
    totalUserSaves: state.userData.totalUserSaves
   }
}

export default connect(mapStateToProps, { storeSaveValuesWithHTML, storeSaveValuesChronologically })(OrganizeSaves);