export function BackgroundDecoration() {
    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-3xl" />
        </div>
    )
}
