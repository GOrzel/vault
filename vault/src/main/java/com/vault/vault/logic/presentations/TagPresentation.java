package com.vault.vault.logic.presentations;

import com.vault.vault.persistence.models.File;
import com.vault.vault.persistence.models.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by User on 2018-11-02.
 */
public class TagPresentation {

    private static Logger LOG = LoggerFactory.getLogger(TagPresentation.class);


    private long id;
    private String name;
//    private List<File> files;

    public TagPresentation(Tag tag) {
        this.id = tag.getId();
        this.name = tag.getName();
//        this.files = this.getFiles(tag);
    }

    private List<File> getFiles(Tag tag) {
        List<File> results = new ArrayList<>();
        try {
            tag.getFile2Tags().forEach(a -> {
                results.add(a.getFile());
            });
        } catch (NullPointerException e){
            LOG.warn("There are no files tagged by this tag." + e);
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

//    public List<File> getFiles() {
//        return files;
//    }

}
