const PreviousSession = ({ session }) => {
  return (
    <div className="w-[1000px] h-[133px] px-6 pt-5 pb-6 bg-black rounded-sm flex-col justify-start items-start gap-2 inline-flex">
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="text-lime-500 text-base font-semibold font-['Montserrat']">
          {session.date}
        </div>
        <div className="justify-start items-start gap-8 flex">
          <div className="justify-start items-center gap-2 flex">
            <div className="text-white text-xl font-medium font-['Montserrat']">
              3
            </div>
          </div>
        </div>
      </div>
      <div className="text-white text-2xl font-normal font-['Montserrat']">
        {session.name}
      </div>
      <div className="rounded-sm justify-start items-center gap-2 inline-flex">
        <div className="text-orange-500 text-base font-medium font-['Montserrat'] underline">
          View session
        </div>
      </div>
    </div>
  );
};

export default PreviousSession;