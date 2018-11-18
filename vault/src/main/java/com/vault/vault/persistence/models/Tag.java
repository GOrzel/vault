package com.vault.vault.persistence.models;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by User on 2018-11-02.
 */


@Entity
@Table(name = "TAGS")
public class Tag {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tag_Sequence")
    @SequenceGenerator(name = "tag_Sequence", sequenceName = "TAG_SEQ")
    private Long id;

    @Column(name = "name",length = 511)
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tag", cascade = CascadeType.ALL)
    private Set<File2Tags> file2Tags;

    public Tag() {
    }

    public Tag(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<File2Tags> getFile2Tags() {
        return file2Tags;
    }

    public void setFile2Tags(Set<File2Tags> file2Tags) {
        this.file2Tags = file2Tags;
    }
}
