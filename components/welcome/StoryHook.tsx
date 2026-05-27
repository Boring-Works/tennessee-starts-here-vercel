'use client'

import { memo } from 'react'
import styles from './welcome.module.css'

interface StoryHookProps {
  line1: string
  line2: string
}

export const StoryHook = memo(function StoryHook({ line1, line2 }: StoryHookProps) {
  return (
    <p className={styles.storyHook}>
      {line1}
      <br />
      {line2}
    </p>
  )
})
