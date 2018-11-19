package com.vault.vault.logic.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by User on 2018-11-19.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class FileWithoutDataException extends RuntimeException{
    public FileWithoutDataException(String message) {
        super(message);
    }

    public FileWithoutDataException(String message, Throwable cause) {
        super(message, cause);
    }
}