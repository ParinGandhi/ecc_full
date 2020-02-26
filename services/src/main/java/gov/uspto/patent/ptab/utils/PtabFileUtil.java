package gov.uspto.patent.ptab.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import lombok.extern.slf4j.Slf4j;

/**
 * General class for file-related utility methods
 */
@Slf4j
public final class PtabFileUtil {

    public static final char ARCHIVE_FILE_SEP = '_';

    private PtabFileUtil() {

    }

    /**
     * Method: getArchiveFileName Parameters: fileName Returns: String
     * 
     * This method returns a formatted archive name.
     * 
     * @param fileName
     * @return String
     */
    public static String getArchiveFileName(String fileName) {
        Date date = new Date();
        return fileName.trim().replace(' ', ARCHIVE_FILE_SEP) + ARCHIVE_FILE_SEP + date.getTime() + ".zip";
    }

    /**
     * Method: getArchiveFileName Parameters: fileName Returns: String
     * 
     * This method returns a formatted archive name with timeStamp. Used in bulk
     * download scenario
     * 
     * @param fileName
     * @return String
     */
    public static String getArchiveFileName() {
        Date date = new Date();
        return date.getTime() + ".zip";
    }

    /**
     * Writes the bytes to a file
     * 
     * @param bFile
     * @param fileDest
     */
    public static void writeBytesToFile(byte[] byteFile, String fileDest) {
        try (FileOutputStream fileOuputStream = new FileOutputStream(fileDest)) {
            fileOuputStream.write(byteFile);
        } catch (IOException e) {
            log.error("Error writing bytes to file InputStream: ", e);
        }
    }

    /**
     * This method is used to write file input stream to Zip output Stream
     * 
     * @param srcFile
     * @param zos
     * @param buffer
     * @throws IOException
     */
    public static void writeToZip(File srcFile, ZipOutputStream zos, byte[] buffer) throws IOException {
        try (FileInputStream fis = new FileInputStream(srcFile)) {
            zos.putNextEntry(new ZipEntry(srcFile.getName()));
            int length;
            while ((length = fis.read(buffer)) > 0) {
                zos.write(buffer, 0, length);
            }
        }
    }

}
