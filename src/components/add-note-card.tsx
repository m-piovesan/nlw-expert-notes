import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface AddNoteCardProps {
    createNote: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function AddNoteCard({ createNote }: AddNoteCardProps) {
    const [isRecording, setIsRecording] = useState(false)
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

    const handleSaveNote = () => {
        if (content === '') {
            toast.error('Você não pode salvar uma nota vazia')
            return
        }

        createNote(content)

        setContent('')
        setShowOnboarding(true)

        toast.success('Nota salva com sucesso')
    } 

    const handleStartRecording = () => {
        const isSpeechRecognitionSupported = 'webkitSpeechRecognition' in window
            || 'SpeechRecognition' in window

        if (!isSpeechRecognitionSupported) {
            toast.error('Seu navegador não suporta a API de reconhecimento de voz')
            return
        }
        
        setIsRecording(true)

        const speechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
        speechRecognition = new speechRecognitionAPI()

        speechRecognition.lang = 'pt-BR'
        speechRecognition.continuous = true
        speechRecognition.maxAlternatives = 1
        speechRecognition.interimResults = true

        speechRecognition.onresult = (event) => {
            const transcription = Array.from(event.results).reduce((text, result) => {
                return text.concat(result[0].transcript)
            }, '')
        
            setContent(transcription)
        }
    
        speechRecognition.onerror = (event) => {
            console.error(event.error)
        }

        speechRecognition.start()
    }

    const handleStopRecording = () => {
        setIsRecording(false)

        if (speechRecognition) {
            speechRecognition.stop()
        }
    }

    return (
        <Dialog.Root>

            <Dialog.Trigger className='flex flex-col text-left rounded-md bg-slate-700 p-5 gap-3 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
                <span className='text-sm font-medium text-slate-200'>
                    Adicionar nota
                </span>
                
                <p className='text-sm leading-6 text-slate-400'>
                    Grave uma nota em áudio que será convertida em texto ou utilize apenas texto... 
                </p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/60' />

                <Dialog.Content 
                    className='fixed overflow-hidden w-full bg-slate-700 flex flex-col flex-direction outline-none inset-0
                        md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-[60vh] md:max-w-[640px] md:rounded-md md:inset-auto'
                    >
                    <Dialog.Close className='absolute top-5 right-5 p-1 rounded-full bg-slate-800 hover:bg-slate-900'>
                        <X size={20} />
                    </Dialog.Close>
                    
                    <form className='flex-1 flex flex-col'>
                        <div className='flex flex-1 flex-col gap-3 p-5'>
                            <span className='text-sm font-medium text-slate-300'>
                                Adicionar nota
                            </span>
                            
                            {showOnboarding ? (
                                <p className='text-sm leading-6 text-slate-400 text-justify'>
                                    Comece <button type='button' className='font-medium text-lime-400 hover:underline' onClick={handleStartRecording}> gravando uma nota </button> em áudio ou se preferir <button type='button' className='font-medium text-lime-400 hover:underline' onClick={handleStartEditor}> utilize apenas texto</button>...
                                </p>
                            ) : (
                                <textarea 
                                    autoFocus
                                    className='text-sm leading-6 text-slate-400 text-justify bg-transparent outline-none resize-none h-40 overflow-y-auto flex-1'
                                    onChange={handleContentChange}
                                    value={content}
                                >

                                </textarea>
                            )}
                        </div>
                        
                        {isRecording ? (
                            <button 
                                type='button'
                                onClick={handleStopRecording}
                                className='w-full flex items-center justify-center gap-1 py-4 bg-slate-900 text-slate-300 text-sm text-center font-medium hover:text-slate-100'    
                            >
                                <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                                Gravando! <span className='text-lime-400'>(clique para interromper)</span>
                            </button>
                        ) : (
                            <button 
                                type='button'
                                onClick={handleSaveNote}
                                className='w-full py-4 bg-lime-400 text-lime-950 text-sm text-center font-medium hover:bg-lime-500'    
                            >
                                Salvar nota
                            </button>
                        )}
                    </form>
                    
                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>
    )
}