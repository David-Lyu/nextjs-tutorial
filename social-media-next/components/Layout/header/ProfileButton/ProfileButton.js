import { useState, useRef, useEffect } from 'react';
import { GoPerson } from 'react-icons/go';
import { AiFillCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import Image from 'next/image';
import styles from './ProfileButton.module.css';

import ProfileOptions from './ProfileOptions';
//going to add another hidden modal so we can click out and it goes away
export default function ProfileButton(props) {
  const { userId, profilePic } = props;
  const [showOptions, setShowOptions] = useState('hide');
  const [rotateCaretClass, setRotateCaretClass] = useState('');

  useEffect(() => {
    if (showOptions === 'hide') setRotateCaretClass(styles['un-rotate-caret']);
    if (showOptions === 'show') setRotateCaretClass(styles['rotate-caret']);
  }, [showOptions]);

  function onDisplayClick(e) {
    if (showOptions === 'hide') setShowOptions('show');
    if (showOptions === 'show') setShowOptions('hide');
  }

  return (
    <>
      <div className={styles['profile-parent']}>
        <div className={styles['profile-icon']} onClick={onDisplayClick}>
          {profilePic && <Image src={profilePic} alt="profile picture" />}
          {!profilePic && <GoPerson />}
          <AiOutlineCaretDown className={rotateCaretClass} />
        </div>
        <div className={styles['profile-options'] + ' ' + showOptions}>
          <AiFillCaretUp />
          <ProfileOptions userId={userId} />
        </div>
      </div>
      {showOptions === 'show' && (
        <div
          className={styles.overlay}
          onClick={() => {
            setShowOptions('hide');
          }}
        />
      )}
    </>
  );
}
