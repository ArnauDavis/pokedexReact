

export default function NextUp({upNext, prev, triggerFetch}) {
  return (
    <>
    <div className="flex mt-4 justify-between">
      <div className="flex flex-col items-center">
        <div className="h-6 flex items-center justify-center">
          {prev && <span className="text-xl">{prev}</span>}
        </div>
        <button className="box-button" onClick={()=>triggerFetch(prev)} disabled={!prev} type="button">
            <div className="button"><span>← Previous</span></div>
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div className="h-6 flex items-center justify-center">
          {upNext && <span className="text-xl">{upNext}</span>}
        </div>
        <button className="box-button" onClick={()=>triggerFetch(upNext)} disabled={!upNext} type="button">
          <div className="button"><span className="px-4">Next →</span></div>
        </button>
      </div>
    </div>    
    </>
  )
}
