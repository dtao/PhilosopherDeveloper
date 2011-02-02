<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class DeadlockExampleForm
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Me.BigButton = New System.Windows.Forms.Button()
        Me.SuspendLayout()
        '
        'BigButton
        '
        Me.BigButton.Anchor = CType((((System.Windows.Forms.AnchorStyles.Top Or System.Windows.Forms.AnchorStyles.Bottom) _
                    Or System.Windows.Forms.AnchorStyles.Left) _
                    Or System.Windows.Forms.AnchorStyles.Right), System.Windows.Forms.AnchorStyles)
        Me.BigButton.Location = New System.Drawing.Point(21, 21)
        Me.BigButton.Margin = New System.Windows.Forms.Padding(12)
        Me.BigButton.Name = "BigButton"
        Me.BigButton.Size = New System.Drawing.Size(242, 220)
        Me.BigButton.TabIndex = 0
        Me.BigButton.Text = "Illustrate Deadlock"
        Me.BigButton.UseVisualStyleBackColor = True
        '
        'DeadlockExampleForm
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(284, 262)
        Me.Controls.Add(Me.BigButton)
        Me.Name = "DeadlockExampleForm"
        Me.ShowIcon = False
        Me.Text = "Invoke/Deadlock Example"
        Me.ResumeLayout(False)

    End Sub
    Private WithEvents BigButton As System.Windows.Forms.Button

End Class
