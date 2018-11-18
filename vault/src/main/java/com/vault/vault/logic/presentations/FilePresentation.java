package com.vault.vault.logic.presentations;

import com.vault.vault.persistence.models.File;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by User on 2018-11-02.
 */
public class FilePresentation {

    private static Logger LOG = LoggerFactory.getLogger(FilePresentation.class);


    private long id;
    private String name;
    private String hash;
    private Date addDate;
    private List<TagPresentation> tags;
    private byte[] data;


    public FilePresentation() {

    }

    public FilePresentation(File file) {
        this.id = file.getId();
        this.name = file.getName();
        this.hash = file.getHash();
        this.addDate = file.getAddDate();
        this.tags = this.getTags(file);
    }

    private List<TagPresentation> getTags(File file) {
        List<TagPresentation> results = new ArrayList<>();
        try {
            file.getFile2Tags().forEach(a -> {
                results.add(
                        new TagPresentation(a.getTag()));
            });
        } catch (NullPointerException e) {
            LOG.warn("File don't have any tags" + e);
        }
        return results;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public Date getAddDate() {
        return addDate;
    }

    public List<TagPresentation> getTags() {
        return tags;
    }

    public void setTags(List<TagPresentation> tags) {
        this.tags = tags;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}
