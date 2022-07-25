import { useState } from 'react'
import Shortner from './Shortner'

function App() {
  return (
    <main className="grid justify-center items-center w-screen h-screen  bg-[url('https://unsplash.com/photos/nI7knd5sQfo/download?force=true')] bg-no-repeat bg-cover  bg-fixed bg-bottom">
      <Shortner />
    </main>
  )
}

// background: #4568DC;  /* fallback for old browsers */
// background: -webkit-linear-gradient(to right, #B06AB3, #4568DC);  /* Chrome 10-25, Safari 5.1-6 */
// background: linear-gradient(to right, #B06AB3, #4568DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

export default App
