import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createCollection } from 'actions'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import LockerSVG from 'assets/react-svg/Locker01SVG'
import ShareSVG from 'assets/react-svg/ShareSVG'
import MoreSVG from 'assets/react-svg/MoreSVG'
import PropTypes from 'prop-types'
import ShareModal from './ActionBarModal'

const ActionBar = props => {
  const {
    type,
    item,
    insertItem,
    save,
    share,
    className,
    createCollection,
    authId,
  } = props
  const [saveActive, setSaveActive] = useState(false)
  const [shareActive, setShareActive] = useState(false)
  const [moreActive, setMoreActive] = useState(false)
  const [isSharingModal, setIsSharingModal] = useState(false)
  const [shareText, setShareText] = useState('Share')
  const [saveText, setSaveText] = useState('Save')

  useEffect(() => {
    console.log('\n modal', isSharingModal)
  }, [isSharingModal])
  const saveToLocker = async () => {
    if (!insertItem.post_url) {
      insertItem.post_url = insertItem.url
    }
    await createCollection(insertItem)
  }

  const shareToFeed = async (thoughts, tags) => {
    // Locker component passes obj as item

    if (type === 'locker') {
      item.tags = tags
      item.user_thoughts = thoughts
      return await share(item)
    }
    // browse component passes obj as insertItem
    insertItem.tags = tags
    insertItem.user_thoughts = thoughts
    await share(insertItem)
  }

  //TODO: Clean logic
  const handleSaveClick = async () => {
    if (saveActive) {
      return
    }
    setSaveText('Saving')
    setSaveActive(prev => !prev)
    await saveToLocker()
    if (saveActive) {
      setSaveText('Save')
    } else {
      setSaveText('Saved')
    }
  }

  const handleShareClick = async () => {
    console.log('seting state ???', isSharingModal)
    setIsSharingModal(prev => !prev)
  }

  const handleSubmit = async (thoughts, tags) => {
    console.log('LAUNCHED SHARE')
    console.table(insertItem)
    setShareText('Sharing')
    setShareActive(prev => !prev)
    await shareToFeed(thoughts, tags)

    if (shareActive) {
      setShareText('Share')
    } else {
      setShareText('Shared')
    }
  }

  const handleMore = async () => {
    setMoreActive(prev => !prev)
  }

  const handleSaveSvg = () => {
    // do not render saveSvg on locker route
    if (window.location.pathname.includes('locker')) return
    // on feed only render saveSvg when the post is not yours
    // on Browse user_id is undefined therefore condition is true & will render
    return (
      insertItem.user_id !== authId && (
        <div className='wrap-svg save' onClick={handleSaveClick}>
          <LockerSVG className='icon' active={saveActive} />
          <span className='label'>{saveText}</span>
        </div>
      )
    )
  }
  console.log('modal status', isSharingModal)

  return (
    <StyledActionBar
      className={className}
      saveActive={saveActive}
      shareActive={shareActive}
    >
      <div className='wrap-svg share' onClick={handleShareClick}>
        <ShareSVG className='icon' active={shareActive} />
        {/* modal should be placed here :) */}
        <span className='label'>{shareText}</span>
      </div>
      <ShareModal
        handleSubmit={handleSubmit}
        setIsActive={handleShareClick}
        isActive={isSharingModal}
      />
      {handleSaveSvg()}
      <div
        className='wrap-svg more'
        onMouseEnter={handleMore}
        onMouseLeave={handleMore}
      >
        <MoreSVG className='icon' active={moreActive} />
        <span className='label'>Menu</span>
      </div>
    </StyledActionBar>
  )
}

ActionBar.propTypes = {}

const mapStateToProps = ({ auth }) => ({
  authId: auth.id,
})

export default connect(
  mapStateToProps,
  { createCollection }
)(withRouter(ActionBar))

const StyledActionBar = styled.div`
  font-size: 1.2rem;
  display: flex;
  height: 40px;
  overflow: hidden;
  .wrap-svg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: ${props => (props.saveActive ? 'default' : 'pointer')};
    width: 60px;
    transition: 0.1s ease-in-out;
    &:hover {
      color: dodgerblue;
    }
  }
  .save {
    color: ${props => (props.saveActive ? 'dodgerblue' : 'black')};
  }
  .share {
    color: ${props => (props.shareActive ? 'dodgerblue' : 'black')};
  }
  .label {
    font-weight: 600;
    padding-top: 2px;
  }
`
