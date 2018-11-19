package com.vault.vault.persistence.models;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/**
 * Created by User on 2018-10-30.
 */

@Entity
@Table(name = "FILES")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "file_Sequence")
    @SequenceGenerator(name = "file_Sequence", sequenceName = "FILE_SEQ")
    private Long id;

    @Column(name = "name", columnDefinition = "TEXT")
    private String name;

    @Column(name = "hash", length = 511)
    private String hash;

    @Column(name = "data", columnDefinition = "MEDIUMBLOB")
    private byte[] data;

    @Column(name = "create_date")
    @Temporal(TemporalType.DATE) //albo timestamp
    private Date addDate;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "file", cascade = CascadeType.ALL)
    private Set<File2Tags> file2Tags;

    public File() {
    }

    public File(String name, byte[] data, String hash) {
        this.name = name;
        this.hash = hash;
        this.data = data;
        this.addDate = new Date();
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

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public Date getAddDate() {
        return addDate;
    }

    public void setAddDate(Date addDate) {
        this.addDate = addDate;
    }

    public Set<File2Tags> getFile2Tags() {
        return file2Tags;
    }

    public void setFile2Tags(Set<File2Tags> file2Tags) {
        this.file2Tags = file2Tags;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}
