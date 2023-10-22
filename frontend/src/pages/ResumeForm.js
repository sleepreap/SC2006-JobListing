const ResumeForm = () => {
  return (
    <form
      action="/uploadresume/upload"
      method="POST"
      encType="multipart/form-data"
    >
      <br></br>
      <div>
        <label className="custom-file-label">Choose File</label>
        <br></br>
        <input
          type="file"
          name="file"
          id="file"
          className="custom-file-input"
          accept="application/pdf"
        />
      </div>
      <br></br>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ResumeForm;
