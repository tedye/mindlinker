import java.io.*;

/**
 * Created by kfang on 8/2/17.
 */
public class TargetPathGenerator {
    public static void main(String[] args) {
        File file = new File("TargetPathData.txt");
        try {
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file)));
            int position = 3;
            int increment = 1;
            int dist = 120;
            int i = 0;
            do {
                position = writeCycle(bw, position, dist);
                position += increment;
                if (position >= 12) {
                    position -= 12;
                }
                i++;
            } while (i < 12);
            bw.flush();
            bw.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void writeHead(BufferedWriter bw) throws IOException {
        bw.write("{\n");
    }

    private static void writeEnd(BufferedWriter bw, boolean hasComma) throws IOException {
        bw.write("}");
        if (hasComma) {
            bw.write(",\n");
        } else {
            bw.write("\n");
        }
    }

    private static int writeCycle(BufferedWriter bw, int p, int dist) throws IOException {
        for (int i = 0; i < 4; i++) {
            writeHead(bw);
            if (p >= 12) {
                p -= 12;
            }
            bw.write("\"position\":" + p + ",\n");
            bw.write("\"dist\":" + dist + "\n");
            writeEnd(bw, true);
            p += i % 2 == 0 ? 2 : 4;
        }
        return p;
    }
}
