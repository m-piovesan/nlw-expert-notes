import logo from './assets/logo-nlw.svg'

import { AddNoteCard } from './components/add-note-card'
import { NoteCard } from './components/note-card'

const note = {
    date: new Date(),
    content: 'hello world'
}

export function App() {
    return (
        <div className='mx-auto max-w-6xl my-12 space-y-6'>
            <img src={logo} alt="logo" />

            <form className='w-full'>
                <input
                    type="text"
                    placeholder='Busque suas notas...'
                    className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500' 
                />
            </form>

            <div className="h-px bg-slate-700" />

            <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
                <AddNoteCard />

                <NoteCard note={note} />
            </div>
        </div>
    )
}
