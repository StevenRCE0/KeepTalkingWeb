import { Readable } from "stream";
import { wrappedWalk } from "./fs/tree";


enum StreamType {
    'tree',
    'blob',
    'appointment',
    'collaborative',
    'audio',
    'video',
}

export interface Stream {
    type: StreamType,
    streamBuffer: Readable | null,
}

export async function obtainStream(type: StreamType): Promise<Stream> {
    let stream: Stream = {
        type: type,
        streamBuffer: null,
    }
    switch (type) {
        case StreamType.tree:
            const tree = await wrappedWalk('../')
            stream.streamBuffer = Readable.from(tree)
            break;
        default:
            throw new Error('Stream type not implemented')
    }
    return stream
}
