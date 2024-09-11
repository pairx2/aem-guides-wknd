package com.abbott.aem.adc.freestylelibrede.services.impl;

import com.abbott.aem.adc.freestylelibrede.services.FileReaderService;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.jcr.RepositoryException;
import javax.jcr.Node;
import java.io.InputStream;
import java.util.Scanner;

import static com.day.cq.commons.jcr.JcrConstants.JCR_CONTENT;
import static com.day.cq.commons.jcr.JcrConstants.JCR_DATA;

@Component(
        service = FileReaderService.class,
        immediate = true,
        configurationPolicy = ConfigurationPolicy.IGNORE
)
public class FileReaderServiceImpl implements FileReaderService {
    private static final Logger LOG = LoggerFactory.getLogger(FileReaderServiceImpl.class);

    @Override
    public String readTextFile(String path, ResourceResolver resolver) {
        Node fileNode;
        try{
            Resource file = resolver.getResource(path.concat("/").concat(JCR_CONTENT));

            if(file != null){
                fileNode = file.adaptTo(Node.class);

                if(fileNode != null){
                    InputStream inputStream = fileNode.getProperty(JCR_DATA).getBinary().getStream();
                    Scanner scanner = new Scanner(inputStream, "UTF-8");

                    StringBuilder fileContents = new StringBuilder();
                    while (scanner.hasNextLine()) {
                        fileContents.append(scanner.nextLine());
                    }

                    return fileContents.toString();
                }
            }
        } catch(RepositoryException e) {
            LOG.error("No file found at path: {}", path);
        }

        return StringUtils.EMPTY;
    }
}
