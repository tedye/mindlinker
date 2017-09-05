import java.io.*;

/**
 * Created by kfang on 7/28/17.
 */
public class TurnAnimationMetaDataGenerator {
    static final String[] sprites = {
            "animation/walk-0/walk-0-0000",
            "animation/walk-1/walk-1-0000",
            "animation/walk-2/walk-2-0000",
            "animation/walk-3/walk-3-0000",
            "animation/walk-4/walk-4-0000",
            "animation/walk-5/walk-5-0000",
            "animation/walk-6/walk-6-0000",
            "animation/walk-7/walk-7-0000",
            "animation/walk-8/walk-8-0000",
            "animation/walk-9/walk-9-0000",
            "animation/walk-10/walk-10-0000",
            "animation/walk-11/walk-11-0000"
    };

    static final String TURN_RIGHT_PREFIX = "TurnRight";
    static final String TURN_LEFT_PREFIX = "TurnLeft";
    public static void main(String[] args) {
        File file = new File("AnimationMetaData.txt");
        try {
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file)));
            for (int from = 0; from < 12; from++) {
                //Turn Right
                for (int offset = 1; offset < 12; offset++) {
                    int to = (from + offset) % 12;
                    writeStart(bw);
                    writeAnimationName(bw, TURN_RIGHT_PREFIX, from, to);
                    writeRate(bw, offset + 1);
                    writeLoop(bw, false);
                    writeFrames(bw, from, offset, true);
                    writeEnd(bw);
                }

                //Turn Left
                for (int offset = 1; offset < 12; offset++) {
                    int to = (from - offset) >= 0 ? from - offset : from - offset + 12;
                    writeStart(bw);
                    writeAnimationName(bw, TURN_LEFT_PREFIX, from, to);
                    writeRate(bw, offset + 1);
                    writeLoop(bw, false);
                    writeFrames(bw, from, offset, false);
                    writeEnd(bw);
                }
            }
            bw.flush();
            bw.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void writeStart(BufferedWriter bw) throws IOException {
        bw.write("{\n");
    }

    private static void writeEnd(BufferedWriter bw) throws IOException {
        bw.write("},\n");
    }

    private static void writeAnimationName(BufferedWriter bw, String prefix, int from, int to) throws IOException {
        bw.write("\"name\":");
        bw.write("\"" + prefix + from + "_" + to + "\"");
        bw.write(",\n");
    }

    private static void writeRate(BufferedWriter bw, int rate) throws IOException {
        bw.write("\"rate\":");
        bw.write("" + rate);
        bw.write(",\n");
    }

    private static void writeLoop(BufferedWriter bw, boolean isLoop) throws IOException {
        bw.write("\"loop\":");
        bw.write(isLoop ? "true" : "false");
        bw.write(",\n");
    }

    private static void writeFrames(BufferedWriter bw, int from, int offset, boolean turnRight) throws IOException {
        bw.write("\"frames\":[\n");
        bw.write("\"" + sprites[from] + "\",\n");
        if (turnRight) {
            for (int i = 1; i <= offset; i++) {
                int spriteIndex = (from + i) % 12;
                if (i == offset) {
                    bw.write("\"" + sprites[spriteIndex] + "\"\n");
                } else {
                    bw.write("\"" + sprites[spriteIndex] + "\",\n");
                }
            }
        } else {
            for (int i = 1; i <= offset; i++) {
                int spriteIndex = from - i >= 0 ? from - i : from - i + 12;
                if (i == offset) {
                    bw.write("\"" + sprites[spriteIndex] + "\"\n");
                } else {
                    bw.write("\"" + sprites[spriteIndex] + "\",\n");
                }
            }
        }
        bw.write("]\n");
    }
}
