package gov.uspto.patent.ptab.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.log4j.Logger;

/**
 * This class is utility for ZIP files in the given directory , retrieving the list of files in the given directory etc.
 * 
 * @author 2020 Development Team
 * 
 */
public class ZipUtil {

    private static final Logger log = Logger.getLogger(ZipUtil.class);
    private static final int MAX_BYTES = 1024;
    private static final String ZIP_EXTN = ".zip";
    private static final int ZERO = 0;
    private static final int ONE = 1;

    /**
     * Private constructor to hide implicit public constructor
     */
    private ZipUtil() {

    }

    /**
     * This method will get the list of files in given directory and add to fileList
     * 
     * @param dir - input directory
     * @param fileList - list of files
     */
    public static void getAllFiles(final File dir, final List<File> fileList) {
        final File[] files = dir.listFiles();
        if (null != files) {
            for (final File file : files) {
                fileList.add(file);
                if (file.isDirectory()) {
                    getAllFiles(file, fileList);
                }
            }
        }
    }

    /**
     * This method will add given input list of files and make it into ZIP folder
     * 
     * @param directoryToZip - the directory to be zipped
     * @param fileList - list of files
     */
    public static void writeZipFile(final File directoryToZip, final List<File> fileList) {
        try (FileOutputStream fos = new FileOutputStream(directoryToZip + File.separator + directoryToZip.getName() + ZIP_EXTN);
                ZipOutputStream zos = new ZipOutputStream(fos)) {
            for (final File file : fileList) {
                if (!file.isDirectory()) { // we only zip files, not directories
                    addToZip(directoryToZip, file, zos);
                }
            }
        } catch (final IOException e) {
            log.error(e.getMessage(), e);
        }
    }

    /**
     * This method will add given file into ZIP format file
     * 
     * @param directoryToZip - the directory to be zipped
     * @param file - file to be added to the archive
     * @param zipOutputStream -output stream
     */
    public static void addToZip(final File directoryToZip, final File file, final ZipOutputStream zipOutputStream) {
        try (FileInputStream fis = new FileInputStream(file)) {
            final String zipFilePath = file.getCanonicalPath().substring(directoryToZip.getCanonicalPath().length() + ONE,
                    file.getCanonicalPath().length());
            final ZipEntry zipEntry = new ZipEntry(zipFilePath);
            zipOutputStream.putNextEntry(zipEntry);
            final byte[] bytes = new byte[MAX_BYTES];
            int length;
            while ((length = fis.read(bytes)) >= ZERO) {
                zipOutputStream.write(bytes, ZERO, length);
            }
            zipOutputStream.closeEntry();
        } catch (final IOException e) {
            log.error(e.getMessage(), e);
        }
    }

    /**
     * Method: addToZipArchive Parameter: archiveName, filenames, inputStreams Returns: ZipOutputStream This method returns
     * an instance of ZipOutputStream.
     * 
     * @param archiveName
     * @param fileNames
     * @param inputStreams
     * @return FileOutputStream
     */
    public static void addToZipArchive(String archiveName, String[] fileNames, InputStream[] inputStreams) {
        try (FileOutputStream fos = new FileOutputStream(archiveName); ZipOutputStream zos = new ZipOutputStream(fos)) {
            int i = 0;
            for (String fileName : fileNames) {
                addToZipFile(fileName, inputStreams[i], zos);
                i++;
            }
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        } finally {
            for (InputStream inputStream : inputStreams) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    log.error(e.getMessage(), e);
                }
            }
        }
    }

    /**
     * Method: addToZipFile Parameters: fileName, fs, zos Returns: void This method add a file to an existing zip archive.
     * 
     * @param fileName
     * @param fs
     * @param zos
     * @throws FileNotFoundException
     * @throws IOException
     */
    public static void addToZipFile(String fileName, InputStream fs, ZipOutputStream zos) throws IOException {
        log.info("Writing '" + fileName + "' to zip file");
        ZipEntry zipEntry = new ZipEntry(fileName);
        zos.putNextEntry(zipEntry);
        byte[] bytes = new byte[(int) PTABConstants.ONE_KILO_BYTE];
        int length;
        while ((length = fs.read(bytes)) >= 0) {
            zos.write(bytes, 0, length);
        }
        zos.closeEntry();
        fs.close();
    }

    /**
     * Gets the readable File Size
     * 
     * @param size
     * @return String
     */
    public static String readableFileSize(long size) {
        if (size <= 0) {
            return "0";
        }
        final String[] units = new String[] { "B", "kB", "MB", "GB", "TB" };
        int digitGroups = (int) (Math.log10(size) / Math.log10(PTABConstants.ONE_KILO_BYTE));
        return new DecimalFormat("#,##0.#").format(size / Math.pow(PTABConstants.ONE_KILO_BYTE, digitGroups)) + " "
                + units[digitGroups];
    }
}
