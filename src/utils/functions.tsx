export const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60) || 0
    const seconds = (duration - minutes * 60) || 0
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}