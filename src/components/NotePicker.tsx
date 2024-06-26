'use client'

import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Tiptap from './TipTap'

const Todo = () => {
  const [content, setContent] = useState<string>('')
  const handleContentChange = (reason: any) => {
    setContent(reason)
  }
  const handleSubmit = (e: any) => {
    
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl w-full grid place-items-center mx-auto pt-10 mb-10"
    >
      <div className="text-3xl text-center text-sky-300 mb-10">
        Notes Picker
      </div>
      <Tiptap
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
      />
    </form>
  )
}

export default Todo