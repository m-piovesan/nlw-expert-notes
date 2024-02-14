import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function AddNoteCard() {
    const [showOnboarding, setShowOnboarding ] = useState(true)
    const [content, setContent] = useState('')
    
    const handleStartEditor = () => {
        setShowOnboarding(false)
    }
    
    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value)
        
        if (event.target.value === '') {
            setShowOnboarding(true)
        }
    }

    const handleSaveNote = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (content === '') {
            toast.error('Você não pode salvar uma nota vazia')
            return
        }

        toast.success('Nota salva com sucesso')
    } 

    return (
        <Dialog.Root>

            <Dialog.Trigger className='flex flex-col text-left rounded-md bg-slate-700 p-5 gap-3 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
                <span className='text-sm font-medium text-slate-200'>
                    oi né
                </span>
                
                <p className='text-sm leading-6 text-slate-400'>
                    tô perdido com os cria no cruzeiro do neymá
                </p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/60' />

                <Dialog.Content className='fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] max-w-[640px] w-full bg-slate-700 flex flex-col flex-direction rounded-md outline-none'>
                    <Dialog.Close className='absolute top-5 right-5 p-1 rounded-full bg-slate-800 hover:bg-slate-900'>
                        <X size={20} />
                    </Dialog.Close>
                    
                    <form onSubmit={handleSaveNote} className='flex-1 flex flex-col'>
                        <div className='flex flex-1 flex-col gap-3 p-5'>
                            <span className='text-sm font-medium text-slate-300'>
                                Adicionar nota
                            </span>
                            
                            {showOnboarding ? (
                                <p className='text-sm leading-6 text-slate-400 text-justify'>
                                    Comece <button className='font-medium text-lime-400 hover:underline' onClick={handleStartEditor}> gravando uma nota </button> em áudio ou se preferir <button className='font-medium text-lime-400 hover:underline' onClick={handleStartEditor}> utilize apenas texto</button>...
                                </p>
                            ) : (
                                <textarea 
                                    autoFocus
                                    className='text-sm leading-6 text-slate-400 text-justify bg-transparent outline-none resize-none h-40 overflow-y-auto flex-1'
                                    onChange={handleContentChange}
                                >

                                </textarea>
                            )}
                        </div>
                        
                        <button 
                            type='submit'
                            className='w-full py-4 bg-lime-400 text-lime-950 text-sm text-center font-medium hover:bg-lime-500'    
                        >
                            Salvar nota
                        </button>
                    </form>
                    
                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>
    )
}