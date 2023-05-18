export function EmptyMemories() {
  return (
    <div className="flex flex-col p-16 bg-[url(../assets/bg-starts.svg)] bg-cover">
      <div className="flex flex-1 items-center justify-center">
        <p className="text-center leading-relaxed w-[360]">
          Você ainda não registrou nenhuma lembrança, comece a{" "}
          <a className="underline hover:text-gray-50" href="">
            criar agora!
          </a>{" "}
        </p>
      </div>
    </div>
  );
}
